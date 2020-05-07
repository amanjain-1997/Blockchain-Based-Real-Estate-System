# Pathname JS 🛣
[![npm version](https://badge.fury.io/js/pathname-js.svg)](https://badge.fury.io/js/pathname-js)
[![Maintainability](https://api.codeclimate.com/v1/badges/604d5a71ae35e3ee16c2/maintainability)](https://codeclimate.com/github/juliendargelos/pathname-js/maintainability)

Simply manage paths.

## Install

```
npm install pathname-js
```

## Usage

```javascript
var Pathname = require('pathname-js');

var pathname = new Pathname("some/path/with/an/:id");
pathname.string;
// => "some/path/with/an/:id"

pathname[2] = 'to';
pathname[3] = 'number';
pathname.id = 4;
pathname.string;
// => "some/path/to/number/4"

pathname.concat('and', 'letter/:letter');
pathname.letter = 'A';
pathname.string;
// => "some/path/to/number/4/and/letter/A"
```

<a name="Pathname"></a>

## Pathname ⇐ <code>Array</code>
**Kind**: global class  
**Extends**: <code>Array</code>  

* [Pathname](#Pathname) ⇐ <code>Array</code>
    * [new Pathname(...parts)](#new_Pathname_new)
    * [.root](#Pathname+root) : <code>boolan</code>
    * [.keys](#Pathname+keys) : <code>Array.&lt;string&gt;</code>
    * [.clone](#Pathname+clone) : [<code>Pathname</code>](#Pathname)
    * [.raw](#Pathname+raw) : <code>string</code>
    * [.string](#Pathname+string) : <code>string</code>
    * [.toString()](#Pathname+toString) ⇒ <code>string</code>
    * [.match(pattern)](#Pathname+match) ⇒ <code>Array</code>
    * [.replace(pattern)](#Pathname+replace) ⇒ [<code>Pathname</code>](#Pathname)
    * [.push(...parts)](#Pathname+push) ⇒ [<code>Pathname</code>](#Pathname)
    * [.concat(...parts)](#Pathname+concat) ⇒ [<code>Pathname</code>](#Pathname)
    * [.clear()](#Pathname+clear) ⇒ [<code>Pathname</code>](#Pathname)
    * [.reset()](#Pathname+reset) ⇒ [<code>Pathname</code>](#Pathname)

<a name="new_Pathname_new"></a>

### new Pathname(...parts)
Create a [Pathname](#Pathname) object.


| Param | Type | Description |
| --- | --- | --- |
| ...parts | <code>string</code> \| <code>Array</code> | Same value as [concat](#Pathname+concat)'s parameters. |

<a name="Pathname+root"></a>

### pathname.root : <code>boolan</code>
<code>true</code> if the pathname is absolute, <code>false</code> in the other case.

**Kind**: instance property of [<code>Pathname</code>](#Pathname)  
<a name="Pathname+keys"></a>

### pathname.keys : <code>Array.&lt;string&gt;</code>
The path parameter keys.

**Kind**: instance property of [<code>Pathname</code>](#Pathname)  
**Read only**: true  
<a name="Pathname+clone"></a>

### pathname.clone : [<code>Pathname</code>](#Pathname)
A clone of the path.

**Kind**: instance property of [<code>Pathname</code>](#Pathname)  
**Read only**: true  
<a name="Pathname+raw"></a>

### pathname.raw : <code>string</code>
Path string value, without replacing parameters by values.

**Kind**: instance property of [<code>Pathname</code>](#Pathname)  
**Read only**: true  
<a name="Pathname+string"></a>

### pathname.string : <code>string</code>
Path string value, with parameters replaced by values. When set, it can have new parameters.

**Kind**: instance property of [<code>Pathname</code>](#Pathname)  
<a name="Pathname+toString"></a>

### pathname.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>Pathname</code>](#Pathname)  
**Returns**: <code>string</code> - Value of [Patname#string](Patname#string)  
<a name="Pathname+match"></a>

### pathname.match(pattern) ⇒ <code>Array</code>
Match a pattern on the path.

**Kind**: instance method of [<code>Pathname</code>](#Pathname)  
**Returns**: <code>Array</code> - The match result.  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>RegExp</code> | The pattern to match. |

<a name="Pathname+replace"></a>

### pathname.replace(pattern) ⇒ [<code>Pathname</code>](#Pathname)
Replace a pattern on the path.

**Kind**: instance method of [<code>Pathname</code>](#Pathname)  
**Returns**: [<code>Pathname</code>](#Pathname) - The replaced path.  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>RegExp</code> | The pattern to replace. |

<a name="Pathname+push"></a>

### pathname.push(...parts) ⇒ [<code>Pathname</code>](#Pathname)
Same as [Patname#concat](Patname#concat)

**Kind**: instance method of [<code>Pathname</code>](#Pathname)  
**Returns**: [<code>Pathname</code>](#Pathname) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| ...parts | [<code>Pathname</code>](#Pathname) \| <code>Array</code> \| <code>string</code> | The parts to add to the path. |

<a name="Pathname+concat"></a>

### pathname.concat(...parts) ⇒ [<code>Pathname</code>](#Pathname)
Adds parts to the path.

**Kind**: instance method of [<code>Pathname</code>](#Pathname)  
**Returns**: [<code>Pathname</code>](#Pathname) - Itself.  

| Param | Type | Description |
| --- | --- | --- |
| ...parts | [<code>Pathname</code>](#Pathname) \| <code>Array</code> \| <code>string</code> | The parts to add to the path. |

<a name="Pathname+clear"></a>

### pathname.clear() ⇒ [<code>Pathname</code>](#Pathname)
Empty the path.

**Kind**: instance method of [<code>Pathname</code>](#Pathname)  
**Returns**: [<code>Pathname</code>](#Pathname) - Itself.  
<a name="Pathname+reset"></a>

### pathname.reset() ⇒ [<code>Pathname</code>](#Pathname)
Set all the path parameters to null.

**Kind**: instance method of [<code>Pathname</code>](#Pathname)  
**Returns**: [<code>Pathname</code>](#Pathname) - Itself.  
