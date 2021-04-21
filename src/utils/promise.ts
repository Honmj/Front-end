type ICallback = (res?: Function, rej?: Function) => void;

export default class myPromise {
  private state: string;

  private value: any;

  private reason: unknown;

  private onResolvedCallbacks: Function[];

  private onRejectedCallbacks: Function[];

  constructor(callFn: ICallback) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value: any) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (err: unknown) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = err;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      callFn(resolve, reject);
    } catch (err: unknown) {
      reject(err);
    }
  }

  private resolvePromise = (promise2, x: any, resolve: Function, reject: Function) => {
    // 循环引用报错
    if (x === promise2) {
      // reject报错
      return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called: boolean = false;
    // x不是null 且x是对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // A+规定，声明then = x的then方法
        const then = x.then;
        // 如果then是函数，就默认是promise了
        if (typeof then === 'function') {
          // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
          then.call(
            x,
            (y) => {
              // 成功和失败只能调用一个
              if (called) return;
              called = true;
              // resolve的结果依旧是promise 那就继续解析
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (err: never) => {
              // 成功和失败只能调用一个
              if (called) return;
              called = true;
              reject(err); // 失败了就失败了
            }
          );
        } else {
          resolve(x); // 直接成功即可
        }
      } catch (e) {
        // 也属于失败
        if (called) return;
        called = true;
        // 取then出错了那就不要在继续执行了
        reject(e);
      }
    } else {
      resolve(x);
    }
  };

  then = (onFulfilled?: Function, onRejected?: Function) => {
    const promise2 = new myPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        const x = onFulfilled!(this.value);
        this.resolvePromise(promise2, x, resolve as Function, reject as Function);
      }
      if (this.state === 'rejected') {
        const x = onRejected!(this.reason);
        this.resolvePromise(promise2, x, resolve as Function, reject as Function);
      }

      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          const x = onFulfilled!(this.value);
          this.resolvePromise(promise2, x, resolve as Function, reject as Function);
        });
        this.onRejectedCallbacks.push(() => {
          const x = onRejected!(this.reason);
          this.resolvePromise(promise2, x, resolve as Function, reject as Function);
        });
      }
    });
    return promise2;
  };
}
