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
            var res = null;

            while (queue.length) {
                var obj = queue.shift();

                if (obj && obj[key] && obj[key].length) {
                    queue = queue.concat(obj[key]);
                }

                res = step(obj, res);
                // 当用户手动break 时，终止遍历
                if (res && res.break) {
                    return res.result;
                }
            }

            return res ? res.result : null;
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
            var res = null;

            while (stack.length) {
                var obj = stack.pop();

                if (obj && obj[key] && obj[key].length) {
                    stack = stack.concat(obj[key].reverse());
                }

                res = step(obj, res);
                // 当用户手动break时，终止遍历
                if (res && res.break) {
                    return res.result;
                }
            }

            return res ? res.result : null;
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
