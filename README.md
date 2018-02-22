# errlog.io-webhook

An beta version NodeJs module to the [errlog.io webhook](https://errlog.io/docs/webhook-api).

## Install

### For Node:

Add the following to your package.json file under dependencies:

```bash
npm install errlog.io-webhook
```

## Import

```javascript
import {ErrLogIo} from 'errlog.io-webhook';
const errLogIo = ErrLogIo('my-errlog.io-API-key');
```

## Use
```javascript
errLogIo.send({message: 'The penguins are escaping!', applicationname: 'my-shiny-new-app'});
```

### Payload Variables

An exhaustive and up-to-date list of payload variables can be found here: 
[https://errlog.io/docs/payload-variables](https://errlog.io/docs/payload-variables)

At the time of writing, the following list of variables were available:

|Variable|Type|Required|Description|
|--- |--- |--- |--- |
|apikey|string|required|This is your ErrLog.IO apikey. |
|message|dynamic|required|This is the error message that you want logged.|
|type|dynamic|recommended|This is the type of event you're logging. In C# it could be "NullReferenceException", "ArgumentException" or just "Exception".|
|applicationname|dynamic|recommended|This is the name of the application that caused the event. Helpful for distinguishing different applications.|
|errordate|dynamic|optional|The datetime the event occurred. Should be in the format yyyy-mm-dd hh:mm:ss where specified.|
|querystring|dynamic|optional|The querystring of the request which caused the event.|
|trace|dynamic|optional|This is the stacktrace of the exception.|
|page|dynamic|optional|This is the page in which the event occurred|
|method|dynamic|optional|This is the method in which the event occurred|
|lineno|int|optional|The line number of the code which caused the event.|
|colno|int|optional|The column number of the code which caused the event.|
|filename|dynamic|optional|The filename of the code which caused the event.|
|useragent|dynamic|optional|This is the useragent string for the client's browser|
|browsername|dynamic|optional|This is the browser the client was using when the event occurred.|
|servername|dynamic|optional|This is an identifier for the server/device on which the event occurred.|
|browser_capabilities|dynamic|optional|This is identifies the capabilities of the client's browser|
|ipaddress|dynamic|optional|This is the IP address of the client device.|
|custom|dynamic|optional|This can be used to store any additional data you want.|
|language|dynamic|optional|This is the programming language the code was written in.|
|session_data|dynamic|optional|Represents a HttpSessionState object.|
|assemblyversion|dynamic|optional|You can use this to represent the version of your application/library.|
|application_data|dynamic|optional|Used to store name/value data from your Application state.|
|request_header|dynamic|optional|This is used to store the HTTP Request Headers as name/value pairs.|
|request_formdata|dynamic|optional|This is used to store the HTTP Request Form Data as name/value pairs.|
|request_cookies|dynamic|optional|This is used to store the HTTP Cookies as name/value pairs.|
|environment|dynamic|optional|This is used to store general environment metrics as name/value pairs.|


## Test

Testing the end-point requires a valid API for some of the tests. You may specify this as a 
single line in a file located in the root of this project named: *TESTING_ERRLOGIO_API_KEY*

e.g. 
```bash
cd errlog.io-webhook repository root
cat "my-errlog.io-api-key" > ./TESTING_ERRLOGIO_API_KEY
```

Running the test is straightforward:

```bash
npm test
```

If developing tests/TDD, you can watch for changes and run the tests after each change automatically.

```bash
npm run test:watch
```
