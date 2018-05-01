# REST-TS
This library aims to provide a generic and typesafe set of annotations to create restful APIs.

It currently uses Express in the background and aims to be full featured and extendable.

This is still very very early and a work in progress!

## Usage Example
### Instantiating a server
```Typescript
import { Rest } from "./Server/Decorators";
import { start } from "./Server";

@Rest({ processes: 0, port: 1234 })
class Server {}

start();
```
This will instantiate a master and as many workers as there are available CPUs on the specified port.

* n is <0: Allocate CPUs - n workers, with a minimum of 1 worker
* n is 0: Allocate as many workers as there are CPUs
* n is >0: Allocate n workders, with a maximum being the number of CPU resources available

# TODO
* Add lifecycle options to class annotated by rest server
* Create controller annotations
* Create data handling mechanisms
* much much more
