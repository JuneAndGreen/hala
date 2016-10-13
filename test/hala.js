'use strict';

const path = require('path');

module.exports = {
	port: 8088,
	webroot: path.join(__dirname, './demo/'),
	viewroot: './views',
	https: true,
	routes: {
		'GET /xxx': 'http://127.0.0.1:8089',
		'GET /api/account/authority/get': function*(next) {
			this.response.body = {
				"message": "5MddQ",
		    "code": "200",
		    "result": {
		        "access": "1",
		        "comment": "2",
		        "leave": "0",
		        "shortMsg": "1",
		        "verification": true,
		        "quote": true,
		        "frame": true
		    }
			};
		},
    'GET /api/account/info/get': function*(next) {
    	this.response.body = {
				"message": "b6oT3OGc",
		    "code": "200",
		    "result": {
		        "id": 1457757006780,
		        "nickname": "I5qx2p",
		        "realname": "HcuAXT0hVAan",
		        "sex": "1",
		        "description": "IIlKGM8yWN",
		        "will": "CbXVvG3xO8bsT"
		    }
			};
		},
    'GET /api/blog/list': function*(next) {
    	this.response.body = {
				"message": "wdUEf OBrv3N9sH3M",
		    "code": 200,
		    "result": [
		        {
		            "id": 1457757006789,
		            "title": "ioo",
		            "author": 1457757006790,
		            "createTime": 1457757006791,
		            "updateTime": 1457757006792,
		            "read": 1457757006793,
		            "comment": 1457757006794,
		            "type": "2",
		            "tag": [
		                {
		                    "id": 1457757006795,
		                    "name": "hBG1x4NNyim2EQ6D",
		                    "count": 1457757006796
		                },
		                {
		                    "id": 1457757006797,
		                    "name": "p S TKHkdKrZkm ",
		                    "count": 1457757006798
		                },
		                {
		                    "id": 1457757006799,
		                    "name": "llk4IzA",
		                    "count": 1457757006800
		                }
		            ]
		        },
		        {
		            "id": 1457757006813,
		            "title": "x3a7os UTOp0E8MM",
		            "author": 1457757006814,
		            "createTime": 1457757006815,
		            "updateTime": 1457757006816,
		            "read": 1457757006817,
		            "comment": 1457757006818,
		            "type": "0",
		            "tag": [
		                {
		                    "id": 1457757006819,
		                    "name": "UTVsT",
		                    "count": 1457757006820
		                },
		                {
		                    "id": 1457757006821,
		                    "name": "UvZK7sCRpSi",
		                    "count": 1457757006822
		                }
		            ]
		        },
		        {
		            "id": 1457757006835,
		            "title": "3O5RD1DRET8",
		            "author": 1457757006836,
		            "createTime": 1457757006837,
		            "updateTime": 1457757006838,
		            "read": 1457757006839,
		            "comment": 1457757006840,
		            "type": "1",
		            "tag": [
		                {
		                    "id": 1457757006841,
		                    "name": "4Q8eHXlmf51ad41FMz",
		                    "count": 1457757006842
		                }
		            ]
		        }
		    ],
		    "total": 3
			};
		},
    'GET /api/tag/list': function*(next) {
    	this.response.body = {
				"message": "928Ssc",
		    "code": 200,
		    "result": [
		        {
		            "id": 1457757007033,
		            "name": "3QxwImFcETOGo",
		            "count": 1457757007034
		        },
		        {
		            "id": 1457757007035,
		            "name": "EEaZvddr7LqCRo2tA6",
		            "count": 1457757007036
		        },
		        {
		            "id": 1457757007037,
		            "name": "n4FcLd35 ttmkWE",
		            "count": 1457757007038
		        },
		        {
		            "id": 1457757007039,
		            "name": "I1CnR7Nr49dkeEgpeT",
		            "count": 1457757007040
		        },
		        {
		            "id": 1457757007041,
		            "name": "Cq7gFhb2",
		            "count": 1457757007042
		        },
		        {
		            "id": 1457757007043,
		            "name": "EG2gF10yG7a9x",
		            "count": 1457757007044
		        },
		        {
		            "id": 1457757007045,
		            "name": "tcNeyVRAkTp",
		            "count": 1457757007046
		        },
		        {
		            "id": 1457757007047,
		            "name": "T33qcLNpz9 MQTKDe",
		            "count": 1457757007048
		        },
		        {
		            "id": 1457757007049,
		            "name": "x6axSMRqtHvg6Ik",
		            "count": 1457757007050
		        },
		        {
		            "id": 1457757007051,
		            "name": "s UCplvvtZet4wxB0",
		            "count": 1457757007052
		        }
		    ],
		    "total": 10
			};
		},
    'GET /blog/': function*(next) {
    	yield this.render('index', {});
		},
    'GET /blog/list/': function*(next) {
    	yield this.render('index', {});
		},
    'GET /blog/tag/': function*(next) {
    	yield this.render('index', {});
		},
    'GET /setting/': function*(next) {
    	yield this.render('index', {});
		},
    'GET /setting/account/': function*(next) {
    	yield this.render('index', {});
		},
    'GET /setting/permission/': function*(next) {
    	yield this.render('index', {});
		}
	}
};