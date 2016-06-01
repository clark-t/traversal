/**
 * @file traversal.js 遍历方法
 * @author clarkt(clarktanglei@163.com)
 */
(function () {
    var traversal = {};

    /**
     * 非递归广度遍历
     *
     * @param {*} arr 数据源
     * @param {string=} key 子节点key
     * @param {Function} step 遍历到每个节点时触发的回调，返回false时结束遍历
     */
    traversal.breadth = function (arr, key, step) {
        if (arr == null || !step || !(step instanceof Function)) {
            return;
        }

        key = key || 'children';
        var queue = [];
        var i;
        var max;

        if (arr instanceof Array) {
            for (i = 0, max = arr.length; i < max; i++) {
                queue.push(arr[i]);
            }
        }
        else {
            queue.push(arr);
        }

        while (queue.length) {
            var obj = queue.shift();

            if (obj && obj[key]) {
                if (obj[key] instanceof Array) {
                    for (i = 0, max = obj[key].length; i < max; i++) {
                        queue.push(obj[key][i]);
                    }
                }
                else {
                    queue.push(obj[key]);
                }
            }

            if (step(obj) === false) {
                break;
            }
        }
    };

    /**
     * 非递归深度遍历
     *
     * @param {*} arr 数据源
     * @param {string=} key 子节点key
     * @param {Function} step 遍历到每个节点时触发的回调，返回false时结束遍历
     */
    traversal.depth = function (arr, key, step) {
        if (arr == null || !step || !(step instanceof Function)) {
            return;
        }

        key = key || 'children';
        var stack = [];
        var i;
        var max;

        if (arr instanceof Array && arr.length) {
            max = arr.length;

            for (i = max - 1; i > -1; i--) {
                stack.push(arr[i]);
            }
        }

        while (stack.length) {
            var obj = stack.pop();

            if (obj && obj[key]) {
                if (obj[key] instanceof Array && obj[key].length) {
                    max = obj[key].length;

                    for (i = max - 1; i > -1; i--) {
                        stack.push(obj[key][i]);
                    }
                }
                else {
                    stack.push(obj[key]);
                }
            }

            if (step(obj) === false) {
                break;
            }
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = traversal;
    }
    else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function () {
            return traversal;
        });
    }
    else {
        this.traversal = traversal;
    }
})
.call(this || typeof window !== 'undefined' ? window : global);
