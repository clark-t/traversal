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
         * @param {Function} step 遍历到每个节点时触发的回调，可返回任意值，
         *                        作为遍历到下一个节点时回调的第二个参数，或者是遍历结束时的返回，
         *                        如果在执行过程中想中断遍历，可令this.break = true;
         * @param {*=} res 遍历结果初始值
         * @param {string=} key 子节点key
         * @return {*} 遍历结果
         */
        breadth: function (arr, step, res, key) {
            key = key || 'children';
            // 浅拷贝数据源
            var queue = arr.slice();
            var me = {};
            step = step.bind(me);

            while (queue.length) {
                var obj = queue.shift();

                if (obj && obj[key] && obj[key].length) {
                    queue = queue.concat(obj[key]);
                }

                res = step(obj, res);
                // 当用户手动break 时，终止遍历
                if (me.break) {
                    return res;
                }
            }

            return res;
        },

        /**
         * 非递归深度遍历
         *
         * @param {Array} arr 数据源
         * @param {Function} step 遍历到每个节点时触发的回调，可返回任意值，
         *                        作为遍历到下一个节点时回调的第二个参数，或者是遍历结束时的返回，
         *                        如果在执行过程中想中断遍历，可令this.break = true;
         * @param {*=} res 遍历结果初始值
         * @param {string=} key 子节点key
         * @return {*} 遍历结果
         */
        depth: function (arr, step, res, key) {
            key = key || 'children';
            // 入栈
            var stack = arr.slice().reverse();
            var me = {};
            step = step.bind(me);

            while (stack.length) {
                var obj = stack.pop();

                if (obj && obj[key] && obj[key].length) {
                    stack = stack.concat(obj[key].slice().reverse());
                }

                res = step(obj, res);

                // 当用户手动break时，终止遍历
                if (me.break) {
                    return res;
                }
            }

            return res;
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
.call(this);
