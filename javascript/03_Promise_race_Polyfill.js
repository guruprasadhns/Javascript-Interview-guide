/**
 * # Heading 1
 * 
 *The Promise.race() method returns a promise that fulfills or rejects as 
    soon as one of the promises in an iterable fulfills or rejects, with the 
    value or reason from that promise. 
 * 
 
 * 
 * Reading the definition, we can break the problem statement into 
    sub-problems to implement the  Promise.race()  method. 
    ●  It returns a promise. 
    ●  The returned promise fulfills or rejects as soon as any one of 
    the input promises fulfills or rejects. 
    ●  Returned promise resolves with the value of the input 
    promise or rejects with the reason of the input promise. 
 */


function _promiseRace(taskList) {
    return new Promise((resolve, reject) => {
        taskList.forEach((task, index) => {
            task.then((res) => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    })
}

function task(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (delay < 500) {
                reject(delay);
            } else {
                resolve(delay);
            }
        })
    })
}

const taskList = [task(300), task(2000), task(5000)];

_promiseRace(taskList).then((res) => {
    console.log('Success', res);
}).catch(err => {
    console.log('Rejected', err);
})