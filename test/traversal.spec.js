/**
 * @file traversal.spec.js
 * @author clarkt(clarktanglei@163.com)
 */
var traversal = require('../traversal');
var expect = require('chai').expect;
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
];

describe('test breadth traversal', function () {
    it('test normal traversal', function () {
        var result = '';
        traversal.breadth(data, function (obj) {
            result += obj.id + ' ';
        });
        expect(result).to.be.equal('1 2 3 4 5 6 7 8 9 10 11 ');
    });

    it('test traversal with break', function () {
        var result = '';
        traversal.breadth(data, function (obj) {
            result += obj.id + ' ';

            if (obj.id === '8') {
                this.break = true;
            }
        });
        expect(result).to.be.equal('1 2 3 4 5 6 7 8 ');
    });

    it('test traversal with result', function () {
        var result = traversal.breadth(
            data,
            function (obj, res) {
                if (obj.id === '8') {
                    this.break = true;
                }
                else {
                    res += obj.id + ' ';
                }

                return res;
            },
            ''
        );
        expect(result).to.be.equal('1 2 3 4 5 6 7 ');
    });
});

describe('test depth traversal', function () {
    it('test normal traversal', function () {
        var result = '';
        traversal.depth(data, function (obj) {
            result += obj.id + ' ';
        });
        expect(result).to.be.equal('1 2 4 5 8 3 6 7 9 10 11 ');
    });

    it('test traversal with break', function () {
        var result = '';
        traversal.depth(data, function (obj) {
            result += obj.id + ' ';

            if (obj.id === '8') {
                this.break = true;
            }
        });
        expect(result).to.be.equal('1 2 4 5 8 ');
    });

    it('test traversal with result', function () {
        var result = traversal.depth(
            data,
            function (obj, res) {
                if (obj.id === '8') {
                    this.break = true;
                }
                else {
                    res += obj.id + ' ';
                }

                return res;
            },
            ''
        );
        expect(result).to.be.equal('1 2 4 5 ');
    });
});
