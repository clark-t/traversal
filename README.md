# traversal.js

## 背景
我们经常需要对一些多叉树的树形结构的数据进行遍历操作。
过去我经常使用递归来进行数据遍历，但递归式遍历如果没进行尾调优化的话，很容易会发生堆栈溢出；同时递归遍历实质上属于深度遍历，在某些应用场景当中，广度遍历明显比深度遍历性能更好。
所以我写了两种遍历的非递归实现，广度遍历和深度遍历，使用者可根据实际情况进行使用。

## 使用说明
目前兼容commonjs AMD 以及普通的加载方式

### commonjs/AMD
```javascript
var traversal = require('path/to/traversal');
```

### 普通加载
```javascript
var traversal = window.traversal;
```

## 函数参数及返回说明
广度遍历和深度遍历方法均可传入3个参数：
1. arr {Array.<Object>} 数据源 要求类型为数组，数组得每一项为Object，代表树的一个节点。该节点的子节点数据的字段名默认为children，可通过函数的第三个参数进行指定
2. step {Function(data:Object, result:Object):Object | null} 遍历每个节点时的回调函数，该函数有两个参数，data和result，其中data为当前遍历节点的Object对象，result为上一步遍历返回的结果对象。该回调函数可设置返回值，要求该返回值类型必须为Object，如果需要中断遍历，则返回的结果对象result带有字段break，且result.break === true即可实现遍历中断。遍历中断或者是遍历结束时，会最后一次遍历的回调函数所返回的result.result作为遍历执行结果进行返回。
3. key {string=} 指定数据源的子节点字段名，当该参数为空时，数据源的子节点字段名默认为chilren。

## 例子

### 普通使用方法

```javascript
var traversal = require('path/to/traversal');
traversal.breadth(
    [
        {
            id: '1',
            children: [
                {
                    id: '2',
                    children: [
                        {
                            id: '4'
                        },
                        {
                            id: '5',
                            children: [{
                                id: '8'
                            }]
                        }
                    ]
                },
                {
                    id: '3',
                    children: [{
                        id: '6'
                    },
                    {
                        id: '7',
                        children: [
                            {
                                id: '9',
                                children: [
                                    {
                                        id: '10'
                                    },
                                    {
                                        id: '11'
                                    }
                                ]
                            }
                        ]
                    }]
                }
            ]
        }
    ],
    function (obj) {
        console.log(obj.id);
    }
);
```

输出结果为：'1' '2' '3' '4' '5' '6' '7' '8' '9' '10' '11'

```javascript
traversal.depth(
    [
        {
            id: '1',
            children: [
                {
                    id: '2',
                    children: [
                        {
                            id: '4'
                        },
                        {
                            id: '5',
                            children: [{
                                id: '8'
                            }]
                        }
                    ]
                },
                {
                    id: '3',
                    children: [
                        {
                            id: '6'
                        },
                        {
                            id: '7',
                            children: [
                                {
                                    id: '9',
                                    children: [
                                        {
                                            id: '10'
                                        },
                                        {
                                            id: '11'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    function (obj) {
        console.log(obj.id);
    }
);
```

输出结果为：'1' '2' '4' '5' '8' '3' '6' '7' '9' '10' '11'

### 中断遍历使用方法

当id === '8'时，终止遍历

```javascript
var traversal = require('path/to/traversal');
traversal.breadth(
    [
        {
            id: '1',
            children: [
                {
                    id: '2',
                    children: [
                        {
                            id: '4'
                        },
                        {
                            id: '5',
                            children: [{
                                id: '8'
                            }]
                        }
                    ]
                },
                {
                    id: '3',
                    children: [{
                        id: '6'
                    },
                    {
                        id: '7',
                        children: [
                            {
                                id: '9',
                                children: [
                                    {
                                        id: '10'
                                    },
                                    {
                                        id: '11'
                                    }
                                ]
                            }
                        ]
                    }]
                }
            ]
        }
    ],
    function (obj) {
        console.log(obj.id);

        if (obj.id === '8') {
            return {break: true};
        }
    }
);
```

输出结果为：'1' '2' '3' '4' '5' '6' '7' '8'

```javascript
traversal.depth(
    [
        {
            id: '1',
            children: [
                {
                    id: '2',
                    children: [
                        {
                            id: '4'
                        },
                        {
                            id: '5',
                            children: [{
                                id: '8'
                            }]
                        }
                    ]
                },
                {
                    id: '3',
                    children: [
                        {
                            id: '6'
                        },
                        {
                            id: '7',
                            children: [
                                {
                                    id: '9',
                                    children: [
                                        {
                                            id: '10'
                                        },
                                        {
                                            id: '11'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    function (obj) {
        console.log(obj.id);

        if (obj.id === '8') {
            return {break: true};
        }
    }
);
```

输出结果为：'1' '2' '4' '5' '8'

### 返回值用法

返回遍历到id === 8 之前的节点id相加的结果

```javascript
var traversal = require('path/to/traversal');
var result = traversal.breadth(
    [
        {
            id: '1',
            children: [
                {
                    id: '2',
                    children: [
                        {
                            id: '4'
                        },
                        {
                            id: '5',
                            children: [{
                                id: '8'
                            }]
                        }
                    ]
                },
                {
                    id: '3',
                    children: [{
                        id: '6'
                    },
                    {
                        id: '7',
                        children: [
                            {
                                id: '9',
                                children: [
                                    {
                                        id: '10'
                                    },
                                    {
                                        id: '11'
                                    }
                                ]
                            }
                        ]
                    }]
                }
            ]
        }
    ],
    function (obj, res) {
        if (obj.id === 8) {
            return {break: true, res: res};
        }

        res += obj.id;
        return {res: res};
    }
);

console.log(result);
```

输出结果为：'12345678'

```javascript
var result = traversal.depth(
    [
        {
            id: '1',
            children: [
                {
                    id: '2',
                    children: [
                        {
                            id: '4'
                        },
                        {
                            id: '5',
                            children: [{
                                id: '8'
                            }]
                        }
                    ]
                },
                {
                    id: '3',
                    children: [
                        {
                            id: '6'
                        },
                        {
                            id: '7',
                            children: [
                                {
                                    id: '9',
                                    children: [
                                        {
                                            id: '10'
                                        },
                                        {
                                            id: '11'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    function (obj) {
        if (obj.id === 8) {
            return {break: true, res: res};
        }

        res += obj.id;
        return {res: res};
    }
);

console.log(result);
```

输出结果为：'12458'
