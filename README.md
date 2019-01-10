# Coffeekraken s-rating-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<!-- <a href="https://travis-ci.org/coffeekraken-s-rating-component">
		<img src="https://img.shields.io/travis/coffeekraken-s-rating-component.svg?style=flat-square" />
	</a> -->
	<a href="https://www.npmjs.com/package/coffeekraken-s-rating-component">
		<img src="https://img.shields.io/npm/v/coffeekraken-s-rating-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken-s-rating-component/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-s-rating-component.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken-s-rating-component">
		<img src="https://img.shields.io/npm/dt/coffeekraken-s-rating-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken-s-rating-component">
		<img src="https://img.shields.io/github/forks/coffeekraken-s-rating-component.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken-s-rating-component">
		<img src="https://img.shields.io/github/stars/coffeekraken-s-rating-component.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

<p class="lead">Create nice and fully customizable rating systems with ease</p>

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-rating-component)

## Table of content

1. **[Demo](http://components.coffeekraken.io/app/s-rating-component)**
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [Javascript API](doc/js)
5. [The `for` property](#readme-for)
6. [The `basedOn` property](#readme-based-on)
7. [Moods](#readme-moods)
8. [Sugar Web Components Documentation](https://github.com/coffeekraken/sugar/blob/master/doc/webcomponent.md)
9. [Browsers support](#readme-browsers-support)
10. [Code linting](#readme-code-linting)
11. [Contribute](#readme-contribute)
12. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
13. [Licence](#readme-license)

<a name="readme-install"></a>
## Install

```
npm install coffeekraken-s-rating-component --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import SRatingComponent from 'coffeekraken-s-rating-component'
import SIconComponent from 'coffeekraken-s-icon-component' // optional but used in the demo
```

Then simply use it inside your html like so:

```html
<s-rating for="my-cool-input">
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
</s-rating>
<input type="text" name="my-cool-input" id="my-cool-input" />
```

> Here we use an `s-icon` component as "star" but you can use whatever you prefer. It can be emoji, text, image, etc...

<a id="readme-for"></a>
## The `for` property

If you use this rating component in a form, you'll need a proper form input to take care of sending the value or your rating system.
This is where comes the `for` attribute. It's exactly like the `for` attribute of a `label`. You specify the id (or name) of your input field using a `for` and your good to go.

```html
<s-rating for="my-cool-input">
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
</s-rating>
<input type="text" name="my-cool-input" id="my-cool-input" />
```

<a id="readme-based-on"></a>
## The `basedOn` property

By default, the component will take the **number of items (stars)** as the base for the value calculation. You can override that by passing a `basedOn` attribute like so:

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-rating-component?demo=basedOn)

```html
<s-rating based-on="100">
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
</s-rating>
```

This will mean that the calculation will be based on 100 and not on 5. 1 "Star" will mean 100 / 5 * 1 = 20

<a id="readme-moods"></a>
## Moods

In order to customize your rating system as you want, a system of moods has been implemented.
The default moods are `xlow, low, medium, high and xhigh`.
These values are going to be set on the component itself depending on the value of the rating system.
Example:

```html
<s-rating based-on="100">
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
  <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
</s-rating>
```

- **1 star** : `xlow`
- **2 star** : `low`
- **3 star** : `medium`
- **4 star** : `high`
- **5 star** : `xhigh`

You can customize these moods by passing the `moods` property like so:

<s-rating moods="['hello','world','universe']">
  <!-- etc... -->
</s-rating>

<a id="readme-browsers-support"></a>
## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| IE11+ | last 2 versions| last 2 versions| last 2 versions

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

> The webcomponent API (custom elements, shadowDOM, etc...) is not supported in some older browsers like IE10, etc... In order to make them work, you will need to integrate the [corresponding polyfill](https://www.webcomponents.org/polyfills).

<a id="readme-code-linting"></a>
##  Code linting

This package uses some code linting rules. Here's the list:

1. [StandardJS](https://standardjs.com/) for javascript files
2. [Stylelint](https://github.com/stylelint/stylelint) with [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) for `scss` files

> Your commits will not been accepted if the code style is not respected!

<a id="readme-contribute"></a>
## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>
## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.  

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>
## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
