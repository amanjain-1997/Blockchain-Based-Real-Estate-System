# Parameters JS 🔑
[![npm version](https://badge.fury.io/js/parameters-js.svg)](https://badge.fury.io/js/parameters-js)
[![Maintainability](https://api.codeclimate.com/v1/badges/ef4ed91e5826a0767fae/maintainability)](https://codeclimate.com/github/juliendargelos/parameters-js/maintainability)

Simply manage url parameters.

## Install

```
npm install parameters-js
```

## Usage

```javascript
var Parameters = require('parameters-js');

var parameters = new Parameters();

parameters.post = 2;
parameters.string;
// => "post=2"

parameters.date = '10/12/1997';
parameters.string;
// => "post=2&date=10%2F12%2F1997"

parameters.authors = [
    {name: 'Marie', country: 'England'},
    {name: 'Marc', country: 'France'}
];
parameters.string;
// => "post=2&date=10%2F12%2F1997&authors[][name]=Marie&authors[][country]=England&authors[][name]=Marc&authors[][country]=France"

var otherParameters = new Parameters();
otherParameters.string = "post=2&date=10%2F12%2F1997&authors[][name]=Marie&authors[][country]=England&authors[][name]=Marc&authors[][country]=France";
otherParameters;
// => Parameters {
//      post: '2',
//      date: '10/12/1997',
//      authors: [
//        {name: 'Marie', country: 'England'},
//        {name: 'Marc', country: 'France'}
//      ]
//    }
```

<a name="Parameters"></a>

## Parameters
**Kind**: global class  

* [Parameters](#Parameters)
    * [new Parameters(...parameters)](#new_Parameters_new)
    * [.keys](#Parameters+keys) : <code>Array.&lt;string&gt;</code>
    * [.flattened](#Parameters+flattened) : [<code>Array.&lt;FlatParameter&gt;</code>](#FlatParameter)
    * [.string](#Parameters+string) : <code>string</code>
    * [.inputs](#Parameters+inputs) : <code>FragmentDocument</code> \| <code>NodeList</code> \| <code>Array</code>
    * [.formData](#Parameters+formData) : <code>FormData</code>
    * [.form](#Parameters+form) : <code>HTMLFormElement</code> \| <code>Element</code>
    * [.json](#Parameters+json) : <code>string</code>
    * [.clone](#Parameters+clone) : [<code>Parameters</code>](#Parameters)
    * [.empty](#Parameters+empty) : <code>boolean</code>
    * [.any](#Parameters+any) : <code>boolean</code>
    * [.toString()](#Parameters+toString) ⇒ <code>string</code>
    * [.set(...parameters)](#Parameters+set) ⇒ [<code>Parameters</code>](#Parameters)
    * [.unset(...keys)](#Parameters+unset) ⇒ [<code>Parameters</code>](#Parameters)
    * [.index(key, [callback])](#Parameters+index) ⇒ <code>number</code>
    * [.have(key, [callback])](#Parameters+have) ⇒ <code>boolean</code>
    * [.each(callback)](#Parameters+each) ⇒ [<code>Parameters</code>](#Parameters)
    * [.map(callback)](#Parameters+map) ⇒ [<code>Parameters</code>](#Parameters)
    * [.reset()](#Parameters+reset) ⇒ [<code>Parameters</code>](#Parameters)
    * [.clear()](#Parameters+clear) ⇒ [<code>Parameters</code>](#Parameters)

<a name="new_Parameters_new"></a>

### new Parameters(...parameters)
Create a [Parameters](#Parameters) object.


| Param | Type | Description |
| --- | --- | --- |
| ...parameters | <code>Object</code> | Same value as [set](#Parameters+set)'s parameters. |

<a name="Parameters+keys"></a>

### parameters.keys : <code>Array.&lt;string&gt;</code>
The parameters keys.

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Read only**: true  
<a name="Parameters+flattened"></a>

### parameters.flattened : [<code>Array.&lt;FlatParameter&gt;</code>](#FlatParameter)
A flat array corresponding to the parameters. When set, the given flattened parameters array will be parsed to replace the current parameters.

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
<a name="Parameters+string"></a>

### parameters.string : <code>string</code>
A string corresponding to the parameters, ready to be used in a url.  When set, the given string will be parsed to replace the current parameters.

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
<a name="Parameters+inputs"></a>

### parameters.inputs : <code>FragmentDocument</code> \| <code>NodeList</code> \| <code>Array</code>
A set of inputs corresponding the parameters. When set, the given inputs will be parsed to replace the current parameters.

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
<a name="Parameters+formData"></a>

### parameters.formData : <code>FormData</code>
A FormData corresponding to the parameters.

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Read only**: true  
<a name="Parameters+form"></a>

### parameters.form : <code>HTMLFormElement</code> \| <code>Element</code>
A Form corresponding to the parameters. When set, the given form inputs be parsed to replace the current parameters.

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
<a name="Parameters+json"></a>

### parameters.json : <code>string</code>
A json string corresponding to the parameters.  When set, the given json string will be parsed to replace the current parameters.

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
<a name="Parameters+clone"></a>

### parameters.clone : [<code>Parameters</code>](#Parameters)
A clone of the current parameters.

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Read only**: true  
<a name="Parameters+empty"></a>

### parameters.empty : <code>boolean</code>
<code>true</code> if no value different from <code>null</code> can be found in the parameters, <code>false</code> in the other case.

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Read only**: true  
<a name="Parameters+any"></a>

### parameters.any : <code>boolean</code>
Opposite of [empty](#Parameters+empty).

**Kind**: instance property of [<code>Parameters</code>](#Parameters)  
**Read only**: true  
<a name="Parameters+toString"></a>

### parameters.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>string</code> - Value of [string](#Parameters+string)  
<a name="Parameters+set"></a>

### parameters.set(...parameters) ⇒ [<code>Parameters</code>](#Parameters)
Set parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| ...parameters | <code>string</code> \| <code>Object</code> | The parameters to set. If string given the assumed value will be <code>null</code>. |

<a name="Parameters+unset"></a>

### parameters.unset(...keys) ⇒ [<code>Parameters</code>](#Parameters)
Unset parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Object</code> | The parameter keys to unset. |

<a name="Parameters+index"></a>

### parameters.index(key, [callback]) ⇒ <code>number</code>
Looks for the index of the given key and call callback if it was found.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>number</code> - The index of the given key if it exists, null in the other case.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The parameter key whose index your looking for |
| [callback] | [<code>indexCallback</code>](#indexCallback) | The function to call if an index has been found for this key. |

<a name="Parameters+have"></a>

### parameters.have(key, [callback]) ⇒ <code>boolean</code>
Checks that the given key exists and call a callback if it exists.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: <code>boolean</code> - <code>true</code> if the key exists, false in the other case.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The parameter key you want to check the existence. |
| [callback] | [<code>haveCallback</code>](#haveCallback) | The function to call if the key exists. |

<a name="Parameters+each"></a>

### parameters.each(callback) ⇒ [<code>Parameters</code>](#Parameters)
Iterates through parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>eachCallback</code>](#eachCallback) | The function to call for each parameter. |

<a name="Parameters+map"></a>

### parameters.map(callback) ⇒ [<code>Parameters</code>](#Parameters)
Iterates through parameters and replaces values.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>mapCallback</code>](#mapCallback) | The function to call for each parameter. |

<a name="Parameters+reset"></a>

### parameters.reset() ⇒ [<code>Parameters</code>](#Parameters)
Set all parameter values to <code>null</code>.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself  
<a name="Parameters+clear"></a>

### parameters.clear() ⇒ [<code>Parameters</code>](#Parameters)
Removes all the parameters.

**Kind**: instance method of [<code>Parameters</code>](#Parameters)  
**Returns**: [<code>Parameters</code>](#Parameters) - Itself  
<a name="FlatParameter"></a>

## FlatParameter : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The flattened key of the parameter. |
| value | <code>string</code> \| <code>number</code> \| <code>boolean</code> | The value of the parameter |

<a name="indexCallback"></a>

## indexCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the key. |

<a name="haveCallback"></a>

## haveCallback : <code>function</code>
**Kind**: global typedef  
<a name="eachCallback"></a>

## eachCallback ⇒ <code>boolean</code>
**Kind**: global typedef  
**Returns**: <code>boolean</code> - If strictly equal to <code>false</code>, will stop iterating.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The current key. |
| value | <code>\*</code> | The current value. |

<a name="mapCallback"></a>

## mapCallback ⇒ <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>\*</code> - The value that will replace the current value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The current key. |
| value | <code>\*</code> | The current value. |

## Classes

<dl>
<dt><a href="#Parameters">Parameters</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FlatParameter">FlatParameter</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#indexCallback">indexCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#haveCallback">haveCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#eachCallback">eachCallback</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#mapCallback">mapCallback</a> ⇒ <code>*</code></dt>
<dd></dd>
</dl>

