# traversal.js

## 背景
我们经常需要对一些多叉树的树形结构的数据进行遍历操作。
过去我经常使用递归来进行数据遍历，但递归式遍历如果没进行尾调优化的话，很容易会发生堆栈溢出；同时递归遍历实质上属于深度遍历，在某些应用场景当中，广度遍历明显比深度遍历性能更好。
所以我写了两种遍历的非递归实现，广度遍历和深度遍历，使用者可根据实际情况进行使用。

## 使用说明
目前兼容commonjs AMD 以及普通的加载方式

### commonjs/AMD
使用npm进行安装
```bash
npm install data-traversal
```

```javascript
var traversal = require('path/to/data-traversal');
```

### 普通加载
使用script标签引入

```HTML
<script src="path/to/data-traversal/traversal.js"></script>
````

```javascript
var traversal = window.traversal;
```

## 函数参数及返回说明

### 参数说明

广度遍历和深度遍历方法均可传入4个参数：

arr {Array} 数据源 要求类型为数组，数组得每一项为Object，代表树的一个节点。该节点的子节点数据的字段名默认为children，可通过函数的第三个参数进行指定。

step {Function(data:Object, result:Object, event:Object):Object | null} 遍历每个节点时的回调函数，该函数有三个参数，data、result和event，其中data为当前遍历节点的Object对象，result为上一步遍历返回的结果对象，event为事件对象，当设置event.break = true时，将终止遍历。该回调函数可设置返回值，返回值将作为下一步遍历时回调的第二个参数传入，以及作为遍历结束时的结果返回。

res {*=} 遍历返回结果的初始值，可不传。

key {string=} 指定数据源的子节点字段名，当该参数为空时，数据源的子节点字段名默认为'children'。

### 返回结果

遍历结束后的返回结果为最后一次遍历回调返回的结果。

## 例子

### 数据源

```javascript
var data = [
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
];

```

### 普通使用方法

```javascript
traversal.breadth(
    data,
    function (obj) {
        console.log(obj.id);
    }
);
```

输出结果为：'1' '2' '3' '4' '5' '6' '7' '8' '9' '10' '11'

```javascript
traversal.depth(
    data,
    function (obj) {
        console.log(obj.id);
    }
);
```

输出结果为：'1' '2' '4' '5' '8' '3' '6' '7' '9' '10' '11'

### 中断遍历使用方法

当id === '8'时，终止遍历

```javascript
traversal.breadth(
    data,
    function (obj, res, e) {
        console.log(obj.id);

        if (obj.id === '8') {
            e.break = true;
        }
    }
);
```

输出结果为：'1' '2' '3' '4' '5' '6' '7' '8'

```javascript
traversal.depth(
    data,
    function (obj, res, e) {
        console.log(obj.id);

        if (obj.id === '8') {
            e.break = true;
        }
    }
);
```

输出结果为：'1' '2' '4' '5' '8'

### 返回值用法

返回遍历到id === '8' 之前的节点id相加的结果

```javascript
var result = traversal.breadth(
    data,
    function (obj, res, e) {
        if (obj.id === '8') {
            e.break = true;
        }
        else {
            res += obj.id;
        }

        return res;
    },
    ''
);

console.log(result);
```

输出结果为：'1234567'

```javascript
var result = traversal.depth(
    data,
    function (obj, res, e) {
        if (obj.id === '8') {
            e.break = true;
        }
        else {
            res += obj.id;
        }

        return res;
    },
    ''
);

console.log(result);
```

输出结果为：'1245'
