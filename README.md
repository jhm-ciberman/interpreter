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
{
	2 + 4 * (16 - 6) / (4 +1);
}
```

And run it with:

```bash
ciber main.ciber
```

The output will be:

```bash
10
```