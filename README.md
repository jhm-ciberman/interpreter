# interpreter
A test interpreter, made for learning purposes

## Try the interpreter for yourself

```bash
git clone https://github.com/jhm-ciberman/interpreter
cd interpreter
npm install
npm link
```

Then navigate to any directory and create a new file:

```js
// main.ciber
/*
Program that calculates factorial of N 
*/

var product = 1;
var j = 1;
var N = 10;

while ( j <= N ) { // iterative
  product = product * j;
  j = j + 1;
}

product;
```

And run it with:

```bash
ciber main.ciber
```

The output will be:

```bash
10
```