::: warning
The options provided to hooks are not reactive. Therefore, the callback references will be the first rendered options instead of the latest hook’s options. If you are doing complex logic with state changes, you will need to provide a stable reference function.
:::
