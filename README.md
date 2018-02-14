# errlog.io-webhook

An alpha version NodeJs module to the [errlog.io webhook](https://errlog.io/docs/webhook-api).

## Install

### For Node:

Add the following to your package.json file under dependencies:

```json
"dependencies": {
    "errlog.io-webhook": "git@github.com:intribeco/errlog.io-webhook.git"
}
```

## Import

```javascript
import {ErrLogIo} from 'errlog.io-webhook';
const errLogIo = ErrLogIo(myErrlogIoApiKeyString);
```

## Use
```javascript
errLogIo.send({message: 'The penguins are escaping!', applicationname: 'my-shiny-new-app'});
```

### Payload Variables

An exhaustive list of payload variables can be found here: 
[https://errlog.io/docs/payload-variables](https://errlog.io/docs/payload-variables)

## Test

```javascript
npm test
```

or if contributing, you can watch for changes and run the tests after each change automatically.

```javascript
npm run test:watch
```
