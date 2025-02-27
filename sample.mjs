#!/usr/bin/env zx

await $`cat package.json | grep name`

const result = await $`curl https://jsonplaceholder.typicode.com/todos/1`

console.log(JSON.stringify(result, null, 2))