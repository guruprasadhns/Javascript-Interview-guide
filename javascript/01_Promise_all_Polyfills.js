/**
 * # Heading 1
 * 
 * This is a paragraph explaining the purpose of the file or code block.
 * 
 * ## Heading 2
 * 
 * - Point 1: Explanation of some feature.
 * - Point 2: Highlighting another key point.
 * 
 * ### Code Example
 * ```javascript
 * function example() {
 *     console.log("This is a code example");
 * }
 * ```
 * 
 * ## Notes
 * 
 * 1. Keep your comments clear and concise.
 * 2. Follow a consistent style to make it easily readable.
 */

function _promiseAll(tasksList) {
    const result = [];
    let taskCompleted = 0;

    return new Promise((resolve, reject) => {
        tasksList.forEach((task, index) => {
            task.then(res => {
                result[index] = res;
                taskCompleted += 1;

                if (taskCompleted === tasksList.length) {
                    resolve(result);
                }

            }).catch(err => {
                reject(err);
            })

        })
    })
}

function task(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (delay <= 500) {
                reject(delay);
            } else {
                resolve(delay);
            }
        }, delay * 1);
    })
}
const tasksList = [task(1000), task(2000), task(500)];

_promiseAll(tasksList).then(result => {
    console.log('Success!', result);
}).catch(err => {
    console.log('Reject', err);
})