class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;

        this.onFullfilledHandlers = [];
        this.onRejectedHandlers = [];

        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(value) {
        if (this.state === 'pending') {
            this.state = 'fullfilled';
            this.value = value;
            this.onFullfilledHandlers.forEach(callback => callback(this.value));
        }
    }

    reject(reason) {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.reason = reason;
            this.onRejectedHandlers.forEach(callback => callback(this.reason));
        }
    }

    then(onSuccess, onReject) {
        return new MyPromise((resolve, reject) => {
            if (this.state === 'fullfilled') {
                try {
                    const result = onSuccess ? onSuccess(this.value) : this.value;
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }

            if (this.state === 'rejected') {
                try {
                    const result = onReject ? onReject(this.reason) : this.reason;
                    reject(result);
                } catch (error) {
                    reject(error);
                }
            }

            if (this.state === 'pending') {
                this.onFullfilledHandlers.push(() => {
                    try {
                        const result = onSuccess ? onSuccess(this.value) : this.value;
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                })

                this.onRejectedHandlers.push(() => {
                    try {
                        const result = onReject ? onReject(this.reason) : this.reason;
                        reject(result);
                    } catch (error) {
                        reject(error);
                    }
                })


            }
        })
    }

    catch(onReject) {
        return this.then(null, onReject);
    }

    finally(callback) {
        return this.then((value) => {
            callback();
            return value;
        }, (reason) => {
            callback();
            throw reason;
        })
    }
}

const p = new MyPromise((resolve, reject) => {
    reject('Success');
}).then((res) => {
    console.log('then-1', res);
    return 'Then response';
}).then((res) => {
    console.log('then-2', res);
}).catch(err => {
    console.log('catch err', err);
}).finally(() => {
    console.log('finally');
})