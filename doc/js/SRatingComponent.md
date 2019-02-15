# Attributes

Here's the list of available attribute(s).

## value

Specify the value of the rating component.

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **3**


## for

Bound the rating to an input (text or hidden).
This is like the `for` attribute of a label.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


## basedOn

Specify the base of calculation for the value.
If not set, will take the number of items in the component as base.
The value on witch the calculation will be made. 5 stars based on 100 mean 1 active star = 20, etc...

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **null**


## editable

Specify if the rating is editable or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


## moods

Specify the moods that will be applied on the rating component
depending on the his value


Type : **{ Array<String> }**

Default : **["xlow", "low", "medium", "high", "xhigh"]**




# Methods


## setValue

Set the value


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
value  |  **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**  |  The value to set  |  required  |