# traversal.js

## 背景
我们经常需要对一些数据进行遍历操作。
过去我经常使用递归来进行数据遍历，而且遍历方式一般是深度遍历，但其实在某些情况下使用广度遍历应该更好。
因此写了两种遍历的非递归实现，包括广度遍历和深度遍历，其中深度遍历采用的前序遍历，在后续会把中序遍历和后续遍历给补充上去。

## 使用说明
目前兼容commonjs AMD 以及普通的加载方式

### commonjs/AMD
        var traversal = require('path/to/traversal');

### 普通加载
        var traversal = window.traversal;

### 例子
        var traversal = require('path/to/traversal');
        traversal.breadth([{
            id: '1',
            children: [{
                id: '2',
                children: [{
                    id: '4'
                },
                {
                    id: '5',
                    children: [{
                        id: '8'
                    }]
                }]
            },
            {
                id: '3',
                children: [{
                    id: '6'
                },
                {
                    id: '7',
                    children: [{
                        id: '9',
                        children: [{
                            id: '10'
                        },
                        {
                            id: '11'
                        }]
                    }]
                }]
            }]
        }], 'children', function (obj) {
            console.log(obj.id);
        });

    输出结果为：1 2 3 4 5 6 7 8 9 10 11

        traversal.depth([{
            id: '1',
            children: [{
                id: '2',
                children: [{
                    id: '4'
                },
                {
                    id: '5',
                    children: [{
                        id: '8'
                    }]
                }]
            },
            {
                id: '3',
                children: [{
                    id: '6'
                },
                {
                    id: '7',
                    children: [{
                        id: '9',
                        children: [{
                            id: '10'
                        },
                        {
                            id: '11'
                        }]
                    }]
                }]
            }]
        }], 'children', function (obj) {
            console.log(obj.id);
        });

    输出结果为：1 2 4 5 8 3 6 7 9 10 11
