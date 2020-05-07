const Parameters = require('../index')

test('Parameters is instanceable', () => {
  const parameters = new Parameters()

  expect(parameters).toBeInstanceOf(Parameters)
})

test('"parameter" creates the right parameters objects from input', () => {
  const file = {name: 'file-input', type: 'file', files: ['File']}
  const checkbox = {name: 'checkbox-input', type: 'checkbox', checked: true}
  const number = {name: 'number-input', type: 'number', value: '2.5'}
  const text = {name: 'text-input', type: 'text', value: 'Lorem'}

  expect(Parameters.parameter(file)).toEqual({key: 'file-input', value: 'File'})
  expect(Parameters.parameter(checkbox)).toEqual({key: 'checkbox-input', value: true})
  expect(Parameters.parameter(number)).toEqual({key: 'number-input', value: 2.5})
  expect(Parameters.parameter(text)).toEqual({key: 'text-input', value: 'Lorem'})
})

test('"flatten" properly flattens objects', () => {
  const object = {
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      preferences: {
        notifications: 'false',
        language: 'en'
      }
    }
  }

  const flattened = [
    {key: 'user[first_name]', value: 'Jane'},
    {key: 'user[last_name]', value: 'Doe'},
    {key: 'user[tags][]', value: 'Lorem'},
    {key: 'user[tags][]', value: 'Ipsum'},
    {key: 'user[tags][]', value: 'Dolor'},
    {key: 'user[tags][]', value: 'Sit'},
    {key: 'user[tags][]', value: 'Amet'},
    {key: 'user[preferences][notifications]', value: 'false'},
    {key: 'user[preferences][language]', value: 'en'}
  ]

  expect(Parameters.flatten(object)).toEqual(flattened)
})

test('"deepen" properly deepens objects', () => {
  const key = 'lorem[ipsum]'
  const value = 'dolor'
  var object = {}

  Parameters.deepen(object, key, value)

  expect(object).toEqual({lorem: {ipsum: 'dolor'}})
})

test('Objects are transformed into parameters string', () => {
  const parameters = new Parameters({
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      preferences: {
        notifications: 'false',
        language: 'en'
      }
    }
  })

  const string = (
    'user[first_name]=Jane&' +
    'user[last_name]=Doe&' +
    'user[tags][]=Lorem&' +
    'user[tags][]=Ipsum&' +
    'user[tags][]=Dolor&' +
    'user[tags][]=Sit&' +
    'user[tags][]=Amet&' +
    'user[preferences][notifications]=false&' +
    'user[preferences][language]=en'
  )

  expect(parameters.string).toBe(string)
})

test('Strings are transformed into parameters object', () => {
  const parameters = new Parameters()
  parameters.string = (
    'user[first_name]=Jane&' +
    'user[last_name]=Doe&' +
    'user[tags][]=Lorem&' +
    'user[tags][]=Ipsum&' +
    'user[tags][]=Dolor&' +
    'user[tags][]=Sit&' +
    'user[tags][]=Amet&' +
    'user[preferences][notifications]=false&' +
    'user[preferences][language]=en'
  )

  const object = {
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      preferences: {
        notifications: 'false',
        language: 'en'
      }
    }
  }

  expect(parameters).toEqual(object)
})

test('Special characters from parameters values are url encoded', () => {
  const parameters = new Parameters({key: 'áâàäç/?=&:#'})
  const parametersString = 'key=%C3%A1%C3%A2%C3%A0%C3%A4%C3%A7%2F%3F%3D%26%3A%23'

  expect(parameters.string).toBe(parametersString)
})

test('Keys are returned', () => {
  const parameters = new Parameters({
    title: 'Lorem Ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    meta: {
      image: 'lorem-ipsum.jpg'
    }
  })

  const keys = ['title', 'body', 'tags', 'meta']

  expect(parameters.keys).toEqual(keys)
})

test('Parameters are flattened', () => {
  const parameters = new Parameters({
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      preferences: {
        notifications: 'false',
        language: 'en'
      }
    }
  })

  const flattened = [
    {key: 'user[first_name]', value: 'Jane'},
    {key: 'user[last_name]', value: 'Doe'},
    {key: 'user[tags][]', value: 'Lorem'},
    {key: 'user[tags][]', value: 'Ipsum'},
    {key: 'user[tags][]', value: 'Dolor'},
    {key: 'user[tags][]', value: 'Sit'},
    {key: 'user[tags][]', value: 'Amet'},
    {key: 'user[preferences][notifications]', value: 'false'},
    {key: 'user[preferences][language]', value: 'en'}
  ]

  expect(parameters.flattened).toEqual(flattened)
})

test('Flattened parameters are converted to object', () => {
  const parameters = new Parameters()
  parameters.flattened = [
    {key: 'user[first_name]', value: 'Jane'},
    {key: 'user[last_name]', value: 'Doe'},
    {key: 'user[tags][]', value: 'Lorem'},
    {key: 'user[tags][]', value: 'Ipsum'},
    {key: 'user[tags][]', value: 'Dolor'},
    {key: 'user[tags][]', value: 'Sit'},
    {key: 'user[tags][]', value: 'Amet'},
    {key: 'user[preferences][notifications]', value: 'false'},
    {key: 'user[preferences][language]', value: 'en'}
  ]

  const object = {
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      preferences: {
        notifications: 'false',
        language: 'en'
      }
    }
  }

  expect(parameters).toEqual(object)
})

test('JSON strings are parsed into object', () => {
  const parameters = new Parameters()
  parameters.json = (
    '{' +
      '"user":{' +
        '"first_name":"Jane",' +
        '"last_name":"Doe",' +
        '"tags":["Lorem","Ipsum","Dolor","Sit","Amet"],' +
        '"preferences":{' +
          '"notifications":"false",' +
          '"language":"en"' +
        '}' +
      '}' +
    '}'
  )

  const object = {
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      preferences: {
        notifications: 'false',
        language: 'en'
      }
    }
  }

  expect(parameters).toEqual(object)
})

test('Objects are converted into JSON strings', () => {
  const parameters = new Parameters({
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      preferences: {
        notifications: 'false',
        language: 'en'
      }
    }
  })

  const json = (
    '{' +
      '"user":{' +
        '"first_name":"Jane",' +
        '"last_name":"Doe",' +
        '"tags":["Lorem","Ipsum","Dolor","Sit","Amet"],' +
        '"preferences":{' +
          '"notifications":"false",' +
          '"language":"en"' +
        '}' +
      '}' +
    '}'
  )

  expect(parameters.json).toEqual(json)
})

test('An exception is thrown when invalid JSON is provided', () => {
  const parameters = new Parameters()

  expect(() => parameters.json = '{').toThrow()
})

test('"clone" is a equal and different Parameters instance', () => {
  const parameters = new Parameters({
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      preferences: {
        notifications: 'false',
        language: 'en'
      }
    }
  })

  const clone = parameters.clone

  expect(clone).toBeInstanceOf(Parameters)
  expect(clone).toEqual(parameters)
})

test('"empty" returns true if parameters are empty and false in the other case', () => {
  const blankParameters = new Parameters()
  const nullParameters = new Parameters({key: null})
  const falseParameters = new Parameters({key: false})
  const stringParameters = new Parameters({key: 'Lorem'})
  const blankArrayParameters = new Parameters({key: []})

  expect(blankParameters.empty).toBe(true)
  expect(nullParameters.empty).toBe(true)

  expect(falseParameters.empty).toBe(false)
  expect(stringParameters.empty).toBe(false)
  expect(blankArrayParameters.empty).toBe(false)
})

test('"any" returns true if parameters aren\'t empty and false in the other case', () => {
  const blankParameters = new Parameters()
  const nullParameters = new Parameters({key: null})
  const falseParameters = new Parameters({key: false})
  const stringParameters = new Parameters({key: 'Lorem'})
  const blankArrayParameters = new Parameters({key: []})

  expect(blankParameters.any).toBe(false)
  expect(nullParameters.any).toBe(false)

  expect(falseParameters.any).toBe(true)
  expect(stringParameters.any).toBe(true)
  expect(blankArrayParameters.any).toBe(true)
})

test('"toString" is identical to "string"', () => {
  const parameters = new Parameters({
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      preferences: {
        notifications: 'false',
        language: 'en'
      }
    }
  })

  expect(parameters.toString()).toBe(parameters.string)
})

test('"set" properly sets parameters', () => {
  const parameters = new Parameters()

  const object = {
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
      preferences: {
        notifications: 'false',
        language: 'en'
      }
    }
  }

  parameters.set(object)

  expect(parameters).toEqual(object)
})

test('"unset" removes the given keys', () => {
  const parameters = new Parameters({lorem: 'ipsum', dolor: 'sit', amet: 'consectetur'})

  parameters.unset('lorem', 'amet')

  expect(parameters).toEqual({dolor: 'sit'})
})

test('"index" returns the index of the given key and null if it doesn\'t exist', () => {
  const parameters = new Parameters({lorem: 'ipsum', dolor: 'sit'})

  expect(parameters.index('dolor')).toBe(1)
  expect(parameters.index('foo')).toBe(null)
})

test('"have" returns true and call the callback if the given key exists and returns false and doesn\'t call the callback in the other case', () => {
  const parameters = new Parameters({key: ''})
  const callbackToBeCalled = jest.fn()
  const callbackNotToBeCalled = jest.fn()
  parameters.have('key', callbackToBeCalled)
  parameters.have('foo', callbackNotToBeCalled)

  expect(parameters.have('key')).toBe(true)
  expect(callbackToBeCalled).toBeCalled()
  expect(parameters.have('foo')).toBe(false)
  expect(callbackNotToBeCalled).not.toBeCalled()
})

test('"each" iterates through all parameters and breaks if the callback return false', () => {
  const parameters = new Parameters({lorem: 'ipsum', dolor: 'sit'})
  const callback = jest.fn()
  const breakingCallback = jest.fn(() => { return false })

  parameters.each(callback)
  parameters.each(breakingCallback)

  expect(callback).toBeCalledTimes(2)
  expect(callback).toHaveBeenNthCalledWith(1, 'lorem', 'ipsum')
  expect(callback).toHaveBeenNthCalledWith(2, 'dolor', 'sit')
  expect(breakingCallback).toBeCalledTimes(1)
})

test('"map" replace parameters values with the yielded values', () => {
  const parameters = new Parameters({lorem: 'ipsum', dolor: 'sit'})

  parameters.map((key, value) => `replaced ${value}`)

  expect(parameters).toEqual({lorem: 'replaced ipsum', dolor: 'replaced sit'})
})

test('"reset" set all parameters values to null', () => {
  const parameters = new Parameters({lorem: 'ipsum', dolor: 'sit'})
  parameters.reset()

  expect(parameters.lorem).toBe(null)
  expect(parameters.dolor).toBe(null)
})

test('"clear" remove all parameters', () => {
  const parameters = new Parameters({lorem: 'ipsum', dolor: 'sit'})
  parameters.clear()

  expect(parameters.keys).toEqual([])
})
