/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise,那么需要等这个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
*/

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(executor){
    let _this = this
    _this.onFulfilled = []
    _this.onRejected = []
    function resolve(value) {
        if (_this.status === PENDING) {
            _this.status = FULFILLED
            _this.value = value
            _this.onFulfilled.forEach(v => v())
        }
    }

    function reject(reason) {
        if (_this.status === PENDING) {
            _this.status = REJECTED
            _this.reason = reason
            _this.onRejected.forEach(v => v())
        }
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

Promise.prototype.then = function(onResolve, onReject) {

    onResolve = typeof onResolve === 'function' ? onResolve : value => value
    onReject = typeof onReject === 'function' ? onReject : reason => reason
    let _this = this

    let promise2 = new Promise((resolve, reject) => {
        if (_this.status === FULFILLED) {
            setTimeout(() => {
                try {
                    let x = resolve(value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        } else if (_this.status === REJECTED) {
            setTimeout(() => {
                try {
                    let x = reject(reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        } else if (_this.status === PENDING) {
            _this.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = resolve(value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
            _this.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = reject(reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }

    })
    return promise2
}

function resolvePromise(promise2, x, resolve, reject) {
    if( promise2 === x) {
        reject(new TypeError('resolvePromise Error'))
    }

    if (x && typeof x === 'function' || typeof x == 'object') {
        let used;
        try {
            let then = x.then
            if (typeof x === 'function') {
                then.call(x, y => {
                    if (used) return
                    used = true
                    resolvePromise(primise2, y, resolve, reject)
                }, r => {
                    if (used) return
                    used = true
                    reject(r)
                })
            }else {
                if (used) return
                used = true
                resolve(x)
            }
        } catch (e) {
            if (used) return
            used = true
            reject(e)
        }

    } else {
        reject(x)
    }

}



































const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'

function MyPromise(executor) {
    let self = this
    self.status = PENDING
    self.onResolve = []
    self.onReject = []
    function resolve(value) {
        if (self.status === PENDING) {
            self.status = RESOLVE
            self.value = value
            self.onResolve.forEach(v => v())
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECT
            self.reason = reason
            self.onReject.forEach(v => v())
        }
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }

}

MyPromise.prototype.then = function (onResolve, onReject) {
    onResolve = typeof onResolve === 'function' ? onResolve : value => value
    onReject = typeof onReject === 'function' ? onReject : reason => { throw reason }

    let self = this
    let promise2 = new MyPromise((resolve, reject) => {
        if (self.status === RESOLVE) {
            setTimeout(() => {
                try {
                    let x = onResolve(self.value)
                    // ***
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            });
        } else if (self.status === REJECT) {
            setTimeout(() => {
                try {
                    let x = onReject(self.reason)
                    // **
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            });
        } else if (self.status === PENDING) {
            self.onResolve.push(() => {
                setTimeout(() => {
                    try {
                        let x = onResolve(self.value)
                        // ***
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                });
            })

            self.onResolve.push(() => {
                self.onResolve.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onReject(self.reason)
                            // ***
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    });
                })
            })

        }

    })
    return promise2
}

function resolvePromise(promise2, x, resolve, reject) {
    let self = this

    if (promise2 === x) {
        reject(new TypeError('Chaining cycle'))
    }

    if (x && typeof x === 'object' || typeof x === 'function') {
        let used;
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (used) return;
                    used = true
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) => {
                    if (used) return;
                    used = true
                    reject(r)
                })
            } else {
                if (used) true
                used = true
                resolve(x)
            }
        } catch (e) {
            if (used) return;
            used = true
            reject(e)
        }
    } else {
        reject(x)
    }

}

export default MyPromise

