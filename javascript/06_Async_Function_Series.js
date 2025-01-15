
//Using for of loops using async await
const asyncSeriesExecutorUsingLoops = async function (promises) {
    for (let promise of promises) {
        try {
            const result = await promise;
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }
}

function asyncSeriesExecutorUsingRecursion(promises) {
    let promise = promises.shift();
    promise.then(val => {
        console.log(val);
        if (promises.length > 0) {
            asyncSeriesExecutorUsingRecursion(promises);
        }
    })
}

function asyncSeriesExecutorUsingArrayReduce(promises) {
    promises.reduce((acc, curr) => {
        return acc.then(() => {
            return curr.then(val => {
                console.log(val);
            })
        })
    }, Promise.resolve())
}

function asyncTask(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Completing ${i}`);
        }, i * 1)
    })
}

const task1 = [asyncTask(1000), asyncTask(7000), asyncTask(500)];

const task2 = [asyncTask(1000), asyncTask(7000), asyncTask(500)];

const task3 = [asyncTask(1000), asyncTask(7000), asyncTask(500)];

// asyncSeriesExecutorUsingLoops(task1);
// asyncSeriesExecutorUsingRecursion(task2);
asyncSeriesExecutorUsingArrayReduce(task3);