# README

`express-catch-handler` is a function for catching errors thrown from your
request handlers and passing the error to Express `next(err)`. 

# Examples

```ts
import withCatch from 'express-catch-handler'

// bad
app.get('/', (req, res, next) => {
    try {
        // ...your throwable code...
    } catch (err) {
        next(err)
    }
})

// better
app.get('/', withCatch((req, res) => {
    // your throwable code
}))
```

You can customize what error is thrown in the event that your code throws
literal `undefined`:

```ts
import { setDefault } from 'express-catch-handler'

setDefault(new Error('foobar'))

app.get('/', withCatch(req, res) => {
    throw undefined
})
```