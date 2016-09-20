/**
 * @file traversal.js 遍历方法
 * @author clarkt(clarktanglei@163.com)
 */
(function () {
    var traversal = {
        /**
         * 非递归广度遍历
         *
         * @param {Array} arr 数据源
         * @param {Function} step 遍历到每个节点时触发的回调，返回false时结束遍历
         * @param {string=} key 子节点key
         */
        breadth: function (arr, step, key) {
            key = key || 'children';
            // 浅拷贝数据源
            var queue = arr.slice(0);
            var opts;

            while (queue.length) {
                var obj = queue.shift();

                if (obj && obj[key] && obj[key].length) {
                    queue = queue.concat(obj[key]);
                }

                opts = step(obj, opts);
                // 当用户手动break 时，终止遍历
                if (opts && opts.break) {
                    return opts && opts.result;
                }
            }

            return opts ? opts.result : null;
        },

        /**
         * 非递归深度遍历
         *
         * @param {Array} arr 数据源
         * @param {Function} step 遍历到每个节点时触发的回调，返回false时结束遍历
         * @param {string=} key 子节点key
         */
        depth: function (arr, step, key) {
            key = key || 'children';
            // 入栈
            var stack = arr.reverse();
            var opts;

            while (stack.length) {
                var obj = stack.pop();

                if (obj && obj[key] && obj[key].length) {
                    stack = stack.concat(obj[key].reverse());
                }

                opts = step(obj, opts);
                // 当用户手动break时，终止遍历
                if (opts && opts.break) {
                    return opts && opts.result;
                }
            }

            return opts ? opts.result : null;
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
