var $playlistHistory = $('.playlistHistory'); // where songs that have already been played are display 
var $playlistCurrent = $('.playlistCurrent'); // where the current song is displayed
var $playlistQueue = $('.playlistQueue'); // where new songs are added

function Queue() {
    this.data = [];
}

Queue.prototype.add = function (song) {
    this.data.unshift(song);
}
Queue.prototype.remove = function () {
    this.data.shift();
}

Queue.prototype.first = function () {
    if (typeof this.data != "undefined") {
        return this.data[0];
    }
}
Queue.prototype.last = function () {
    if (typeof this.data != "undefined") {
        return this.data[this.data.length - 1];
    }

}
Queue.prototype.size = function () {
    return this.data.length;
}

var q = new Queue();
var songArray = [{
    "album": {
        "album_type": "album",
        "artists": [{
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x"
            },
            "href": "https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x",
            "id": "5K4W6rqBFWDnAN6FQUkS6x",
            "name": "Kanye West",
            "type": "artist",
            "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
        }],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/20r762YmB5HeofjMCiPMLv"
        },
        "href": "https://api.spotify.com/v1/albums/20r762YmB5HeofjMCiPMLv",
        "id": "20r762YmB5HeofjMCiPMLv",
        "images": [{
            "height": 640,
            "url": "https://i.scdn.co/image/cafd8763a050dabc4f6157172bb09a23d09abde3",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://i.scdn.co/image/9e27d58cc64c1c4fc97034ba83c6b938d24582f6",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/6cf0001035578534d00d37b0371108f24fbf63c9",
            "width": 64
        }
        ],
        "name": "My Beautiful Dark Twisted Fantasy",
        "release_date": "2010-01-01",
        "release_date_precision": "day",
        "total_tracks": 13,
        "type": "album",
        "uri": "spotify:album:20r762YmB5HeofjMCiPMLv"
    },
    "artists": [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x"
        },
        "href": "https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x",
        "id": "5K4W6rqBFWDnAN6FQUkS6x",
        "name": "Kanye West",
        "type": "artist",
        "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
    },
    {
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/0ONHkAv9pCAFxb0zJwDNTy"
        },
        "href": "https://api.spotify.com/v1/artists/0ONHkAv9pCAFxb0zJwDNTy",
        "id": "0ONHkAv9pCAFxb0zJwDNTy",
        "name": "Pusha T",
        "type": "artist",
        "uri": "spotify:artist:0ONHkAv9pCAFxb0zJwDNTy"
    }
    ],
    "disc_number": 1,
    "duration_ms": 547733,
    "explicit": true,
    "external_ids": {
        "isrc": "USUM71027402"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/3DK6m7It6Pw857FcQftMds"
    },
    "href": "https://api.spotify.com/v1/tracks/3DK6m7It6Pw857FcQftMds",
    "id": "3DK6m7It6Pw857FcQftMds",
    "is_local": false,
    "is_playable": true,
    "name": "Runaway",
    "popularity": 71,
    "preview_url": null,
    "track_number": 9,
    "type": "track",
    "uri": "spotify:track:3DK6m7It6Pw857FcQftMds"
},
{
    "album": {
        "album_type": "album",
        "artists": [{
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/4sTQVOfp9vEMCemLw50sbu"
            },
            "href": "https://api.spotify.com/v1/artists/4sTQVOfp9vEMCemLw50sbu",
            "id": "4sTQVOfp9vEMCemLw50sbu",
            "name": "Galantis",
            "type": "artist",
            "uri": "spotify:artist:4sTQVOfp9vEMCemLw50sbu"
        }],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/4QcXq4vTVN7dFb7bZa9jG2"
        },
        "href": "https://api.spotify.com/v1/albums/4QcXq4vTVN7dFb7bZa9jG2",
        "id": "4QcXq4vTVN7dFb7bZa9jG2",
        "images": [{
            "height": 640,
            "url": "https://i.scdn.co/image/95659045e6271cd2ca07e0ba1176ad6ce24d7ce7",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://i.scdn.co/image/d87d7b97348c80ef8dbd46d36c12f4836381dd61",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/27253560de890dfcd51661fba7e0ab8e92580091",
            "width": 64
        }
        ],
        "name": "Pharmacy",
        "release_date": "2015-06-05",
        "release_date_precision": "day",
        "total_tracks": 13,
        "type": "album",
        "uri": "spotify:album:4QcXq4vTVN7dFb7bZa9jG2"
    },
    "artists": [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/4sTQVOfp9vEMCemLw50sbu"
        },
        "href": "https://api.spotify.com/v1/artists/4sTQVOfp9vEMCemLw50sbu",
        "id": "4sTQVOfp9vEMCemLw50sbu",
        "name": "Galantis",
        "type": "artist",
        "uri": "spotify:artist:4sTQVOfp9vEMCemLw50sbu"
    }],
    "disc_number": 1,
    "duration_ms": 227073,
    "explicit": false,
    "external_ids": {
        "isrc": "USAT21404265"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/46lFttIf5hnUZMGvjK0Wxo"
    },
    "href": "https://api.spotify.com/v1/tracks/46lFttIf5hnUZMGvjK0Wxo",
    "id": "46lFttIf5hnUZMGvjK0Wxo",
    "is_local": false,
    "is_playable": true,
    "name": "Runaway (U & I)",
    "popularity": 75,
    "preview_url": "https://p.scdn.co/mp3-preview/c1024d02ec15b93fe218692fb9ad23c5bad3e1aa?cid=8f7d07368a474d83be8522127329f9a9",
    "track_number": 4,
    "type": "track",
    "uri": "spotify:track:46lFttIf5hnUZMGvjK0Wxo"
},
{
    "album": {
        "album_type": "album",
        "artists": [{
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/02da1vDJ2hWqfK7aJL6SJm"
            },
            "href": "https://api.spotify.com/v1/artists/02da1vDJ2hWqfK7aJL6SJm",
            "id": "02da1vDJ2hWqfK7aJL6SJm",
            "name": "Soul Asylum",
            "type": "artist",
            "uri": "spotify:artist:02da1vDJ2hWqfK7aJL6SJm"
        }],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/3EFhsxrJoH3yE3r8bHheE6"
        },
        "href": "https://api.spotify.com/v1/albums/3EFhsxrJoH3yE3r8bHheE6",
        "id": "3EFhsxrJoH3yE3r8bHheE6",
        "images": [{
            "height": 640,
            "url": "https://i.scdn.co/image/070aac01a996e419a8b8c87e9b59c5bf330d2f32",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://i.scdn.co/image/96167bb1daa9248f0addbd38d12f27a4d9dd487e",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/dfd251fab387352c77ca74710be4dbfcee3c19bd",
            "width": 64
        }
        ],
        "name": "Grave Dancers Union",
        "release_date": "1992-01-01",
        "release_date_precision": "day",
        "total_tracks": 12,
        "type": "album",
        "uri": "spotify:album:3EFhsxrJoH3yE3r8bHheE6"
    },
    "artists": [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/02da1vDJ2hWqfK7aJL6SJm"
        },
        "href": "https://api.spotify.com/v1/artists/02da1vDJ2hWqfK7aJL6SJm",
        "id": "02da1vDJ2hWqfK7aJL6SJm",
        "name": "Soul Asylum",
        "type": "artist",
        "uri": "spotify:artist:02da1vDJ2hWqfK7aJL6SJm"
    }],
    "disc_number": 1,
    "duration_ms": 265866,
    "explicit": false,
    "external_ids": {
        "isrc": "USSM19200235"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/3TW48DvQ7ChwY1Yy1tkMaP"
    },
    "href": "https://api.spotify.com/v1/tracks/3TW48DvQ7ChwY1Yy1tkMaP",
    "id": "3TW48DvQ7ChwY1Yy1tkMaP",
    "is_local": false,
    "is_playable": true,
    "name": "Runaway Train",
    "popularity": 68,
    "preview_url": "https://p.scdn.co/mp3-preview/b7955ead5c4952e490595c31be111a3febf568a8?cid=8f7d07368a474d83be8522127329f9a9",
    "track_number": 3,
    "type": "track",
    "uri": "spotify:track:3TW48DvQ7ChwY1Yy1tkMaP"
},
{
    "album": {
        "album_type": "album",
        "artists": [{
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C"
            },
            "href": "https://api.spotify.com/v1/artists/0du5cEVh5yTK9QJze8zA0C",
            "id": "0du5cEVh5yTK9QJze8zA0C",
            "name": "Bruno Mars",
            "type": "artist",
            "uri": "spotify:artist:0du5cEVh5yTK9QJze8zA0C"
        }],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/1uyf3l2d4XYwiEqAb7t7fX"
        },
        "href": "https://api.spotify.com/v1/albums/1uyf3l2d4XYwiEqAb7t7fX",
        "id": "1uyf3l2d4XYwiEqAb7t7fX",
        "images": [{
            "height": 636,
            "url": "https://i.scdn.co/image/0a01bbfac984fe3a55192aceea6c0fe9bf495c09",
            "width": 640
        },
        {
            "height": 298,
            "url": "https://i.scdn.co/image/3d279adc8126da0e4b6f2247a6e1dbfbc559e1ac",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/96ebe0fc8c5c9a0ee315575935f1700ef8e02a1d",
            "width": 64
        }
        ],
        "name": "Doo-Wops & Hooligans",
        "release_date": "2010-10-05",
        "release_date_precision": "day",
        "total_tracks": 10,
        "type": "album",
        "uri": "spotify:album:1uyf3l2d4XYwiEqAb7t7fX"
    },
    "artists": [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C"
        },
        "href": "https://api.spotify.com/v1/artists/0du5cEVh5yTK9QJze8zA0C",
        "id": "0du5cEVh5yTK9QJze8zA0C",
        "name": "Bruno Mars",
        "type": "artist",
        "uri": "spotify:artist:0du5cEVh5yTK9QJze8zA0C"
    }],
    "disc_number": 1,
    "duration_ms": 147746,
    "explicit": false,
    "external_ids": {
        "isrc": "USAT21001885"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/5MMLS3xm12D7N26xlfFApr"
    },
    "href": "https://api.spotify.com/v1/tracks/5MMLS3xm12D7N26xlfFApr",
    "id": "5MMLS3xm12D7N26xlfFApr",
    "is_local": false,
    "is_playable": true,
    "name": "Runaway Baby",
    "popularity": 63,
    "preview_url": "https://p.scdn.co/mp3-preview/9e9a874c775f47ae1dc0a45d848f990f66f98854?cid=8f7d07368a474d83be8522127329f9a9",
    "track_number": 4,
    "type": "track",
    "uri": "spotify:track:5MMLS3xm12D7N26xlfFApr"
},
{
    "album": {
        "album_type": "single",
        "artists": [{
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/1LzWWI9v4UKdbBgz8fqi15"
            },
            "href": "https://api.spotify.com/v1/artists/1LzWWI9v4UKdbBgz8fqi15",
            "id": "1LzWWI9v4UKdbBgz8fqi15",
            "name": "Tayla Parx",
            "type": "artist",
            "uri": "spotify:artist:1LzWWI9v4UKdbBgz8fqi15"
        },
        {
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/6LuN9FCkKOj5PcnpouEgny"
            },
            "href": "https://api.spotify.com/v1/artists/6LuN9FCkKOj5PcnpouEgny",
            "id": "6LuN9FCkKOj5PcnpouEgny",
            "name": "Khalid",
            "type": "artist",
            "uri": "spotify:artist:6LuN9FCkKOj5PcnpouEgny"
        }
        ],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/6Xrspi637ex7NEio0geFO4"
        },
        "href": "https://api.spotify.com/v1/albums/6Xrspi637ex7NEio0geFO4",
        "id": "6Xrspi637ex7NEio0geFO4",
        "images": [{
            "height": 640,
            "url": "https://i.scdn.co/image/fcb2bb2943b42e0693df2e59b8839a667024898d",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://i.scdn.co/image/87fdf9f26a5dc8efc564517e2195f88956d79141",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/216c2ee35fab49db2ad025e17613af6b423b414d",
            "width": 64
        }
        ],
        "name": "Runaway (feat. Khalid)",
        "release_date": "2018-03-30",
        "release_date_precision": "day",
        "total_tracks": 1,
        "type": "album",
        "uri": "spotify:album:6Xrspi637ex7NEio0geFO4"
    },
    "artists": [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/1LzWWI9v4UKdbBgz8fqi15"
        },
        "href": "https://api.spotify.com/v1/artists/1LzWWI9v4UKdbBgz8fqi15",
        "id": "1LzWWI9v4UKdbBgz8fqi15",
        "name": "Tayla Parx",
        "type": "artist",
        "uri": "spotify:artist:1LzWWI9v4UKdbBgz8fqi15"
    },
    {
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/6LuN9FCkKOj5PcnpouEgny"
        },
        "href": "https://api.spotify.com/v1/artists/6LuN9FCkKOj5PcnpouEgny",
        "id": "6LuN9FCkKOj5PcnpouEgny",
        "name": "Khalid",
        "type": "artist",
        "uri": "spotify:artist:6LuN9FCkKOj5PcnpouEgny"
    }
    ],
    "disc_number": 1,
    "duration_ms": 238033,
    "explicit": true,
    "external_ids": {
        "isrc": "USAT21801269"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/6mXMILvElYiWu4fa9oaJXe"
    },
    "href": "https://api.spotify.com/v1/tracks/6mXMILvElYiWu4fa9oaJXe",
    "id": "6mXMILvElYiWu4fa9oaJXe",
    "is_local": false,
    "is_playable": true,
    "name": "Runaway (feat. Khalid)",
    "popularity": 65,
    "preview_url": "https://p.scdn.co/mp3-preview/0cb5712e225ae3f34d7d3f4a2b403575deb41674?cid=8f7d07368a474d83be8522127329f9a9",
    "track_number": 1,
    "type": "track",
    "uri": "spotify:track:6mXMILvElYiWu4fa9oaJXe"
},
{
    "album": {
        "album_type": "album",
        "artists": [{
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/58lV9VcRSjABbAbfWS6skp"
            },
            "href": "https://api.spotify.com/v1/artists/58lV9VcRSjABbAbfWS6skp",
            "id": "58lV9VcRSjABbAbfWS6skp",
            "name": "Bon Jovi",
            "type": "artist",
            "uri": "spotify:artist:58lV9VcRSjABbAbfWS6skp"
        }],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/1UUOBzIHw0noiRGRpbt3sz"
        },
        "href": "https://api.spotify.com/v1/albums/1UUOBzIHw0noiRGRpbt3sz",
        "id": "1UUOBzIHw0noiRGRpbt3sz",
        "images": [{
            "height": 636,
            "url": "https://i.scdn.co/image/84ef9a04f7c0d8d6eb090a99f5a540d6c989a43b",
            "width": 640
        },
        {
            "height": 298,
            "url": "https://i.scdn.co/image/f79a0582489a3b4314402b4fd4c7415b608b6063",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/28b11290613a2789d1891044e64e8820bc3291d0",
            "width": 64
        }
        ],
        "name": "Bon Jovi",
        "release_date": "1984-01-01",
        "release_date_precision": "day",
        "total_tracks": 9,
        "type": "album",
        "uri": "spotify:album:1UUOBzIHw0noiRGRpbt3sz"
    },
    "artists": [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/58lV9VcRSjABbAbfWS6skp"
        },
        "href": "https://api.spotify.com/v1/artists/58lV9VcRSjABbAbfWS6skp",
        "id": "58lV9VcRSjABbAbfWS6skp",
        "name": "Bon Jovi",
        "type": "artist",
        "uri": "spotify:artist:58lV9VcRSjABbAbfWS6skp"
    }],
    "disc_number": 1,
    "duration_ms": 230666,
    "explicit": false,
    "external_ids": {
        "isrc": "USPR39402231"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/0X1sqQ652p1sceKM2nJlIJ"
    },
    "href": "https://api.spotify.com/v1/tracks/0X1sqQ652p1sceKM2nJlIJ",
    "id": "0X1sqQ652p1sceKM2nJlIJ",
    "is_local": false,
    "is_playable": true,
    "name": "Runaway",
    "popularity": 66,
    "preview_url": null,
    "track_number": 1,
    "type": "track",
    "uri": "spotify:track:0X1sqQ652p1sceKM2nJlIJ"
},
{
    "album": {
        "album_type": "single",
        "artists": [{
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/4xnihxcoXWK3UqryOSnbw5"
            },
            "href": "https://api.spotify.com/v1/artists/4xnihxcoXWK3UqryOSnbw5",
            "id": "4xnihxcoXWK3UqryOSnbw5",
            "name": "Sasha Sloan",
            "type": "artist",
            "uri": "spotify:artist:4xnihxcoXWK3UqryOSnbw5"
        }],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/4iioyYjn5y3TYGTdl7qdL5"
        },
        "href": "https://api.spotify.com/v1/albums/4iioyYjn5y3TYGTdl7qdL5",
        "id": "4iioyYjn5y3TYGTdl7qdL5",
        "images": [{
            "height": 640,
            "url": "https://i.scdn.co/image/011b3d34b0a6ac5ccad64a08d6d8e6b5cf18c6d7",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://i.scdn.co/image/a2c4aa26eed9d65b57794cc32a7e115b1de17a55",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/15cbb019aaaa67063496598198ab4c8112301790",
            "width": 64
        }
        ],
        "name": "Runaway",
        "release_date": "2017-12-01",
        "release_date_precision": "day",
        "total_tracks": 1,
        "type": "album",
        "uri": "spotify:album:4iioyYjn5y3TYGTdl7qdL5"
    },
    "artists": [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/4xnihxcoXWK3UqryOSnbw5"
        },
        "href": "https://api.spotify.com/v1/artists/4xnihxcoXWK3UqryOSnbw5",
        "id": "4xnihxcoXWK3UqryOSnbw5",
        "name": "Sasha Sloan",
        "type": "artist",
        "uri": "spotify:artist:4xnihxcoXWK3UqryOSnbw5"
    }],
    "disc_number": 1,
    "duration_ms": 218946,
    "explicit": true,
    "external_ids": {
        "isrc": "QM24S1705017"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/7oHijHxh7cI40fNC4S619V"
    },
    "href": "https://api.spotify.com/v1/tracks/7oHijHxh7cI40fNC4S619V",
    "id": "7oHijHxh7cI40fNC4S619V",
    "is_local": false,
    "is_playable": true,
    "name": "Runaway",
    "popularity": 63,
    "preview_url": "https://p.scdn.co/mp3-preview/6c569c5a13fb7fbe6c97e4a7e59fc5eaf1f01857?cid=8f7d07368a474d83be8522127329f9a9",
    "track_number": 1,
    "type": "track",
    "uri": "spotify:track:7oHijHxh7cI40fNC4S619V"
},
{
    "album": {
        "album_type": "album",
        "artists": [{
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz"
            },
            "href": "https://api.spotify.com/v1/artists/6XyY86QOPPrYVGvF9ch6wz",
            "id": "6XyY86QOPPrYVGvF9ch6wz",
            "name": "Linkin Park",
            "type": "artist",
            "uri": "spotify:artist:6XyY86QOPPrYVGvF9ch6wz"
        }],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/6hPkbAV3ZXpGZBGUvL6jVM"
        },
        "href": "https://api.spotify.com/v1/albums/6hPkbAV3ZXpGZBGUvL6jVM",
        "id": "6hPkbAV3ZXpGZBGUvL6jVM",
        "images": [{
            "height": 640,
            "url": "https://i.scdn.co/image/66ff51342a9b250bf5b998fd0ec8e977671468bc",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://i.scdn.co/image/bec4a40aa4ac10b3e5518cf1dcbca33d1e5121ec",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/9b5e12a4d057a8b4313842ee481a9d8ea82945cd",
            "width": 64
        }
        ],
        "name": "Hybrid Theory (Bonus Track Version)",
        "release_date": "2000-10-24",
        "release_date_precision": "day",
        "total_tracks": 15,
        "type": "album",
        "uri": "spotify:album:6hPkbAV3ZXpGZBGUvL6jVM"
    },
    "artists": [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz"
        },
        "href": "https://api.spotify.com/v1/artists/6XyY86QOPPrYVGvF9ch6wz",
        "id": "6XyY86QOPPrYVGvF9ch6wz",
        "name": "Linkin Park",
        "type": "artist",
        "uri": "spotify:artist:6XyY86QOPPrYVGvF9ch6wz"
    }],
    "disc_number": 1,
    "duration_ms": 183973,
    "explicit": false,
    "external_ids": {
        "isrc": "USWB10002406"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/6xtQ23d8GEXgcxyUKPtwc5"
    },
    "href": "https://api.spotify.com/v1/tracks/6xtQ23d8GEXgcxyUKPtwc5",
    "id": "6xtQ23d8GEXgcxyUKPtwc5",
    "is_local": false,
    "is_playable": true,
    "name": "Runaway",
    "popularity": 64,
    "preview_url": "https://p.scdn.co/mp3-preview/28c299674ba25aa86bc6229e75c64da73cdb5c80?cid=8f7d07368a474d83be8522127329f9a9",
    "track_number": 6,
    "type": "track",
    "uri": "spotify:track:6xtQ23d8GEXgcxyUKPtwc5"
},
{
    "album": {
        "album_type": "album",
        "artists": [{
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/03a5eVjzFyQlR4XyVSwt4t"
            },
            "href": "https://api.spotify.com/v1/artists/03a5eVjzFyQlR4XyVSwt4t",
            "id": "03a5eVjzFyQlR4XyVSwt4t",
            "name": "Love and Theft",
            "type": "artist",
            "uri": "spotify:artist:03a5eVjzFyQlR4XyVSwt4t"
        }],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/5p3mCmG9a2zkpquEixdEHD"
        },
        "href": "https://api.spotify.com/v1/albums/5p3mCmG9a2zkpquEixdEHD",
        "id": "5p3mCmG9a2zkpquEixdEHD",
        "images": [{
            "height": 640,
            "url": "https://i.scdn.co/image/3edf65977acc2c2264eb322ebf3bee693cf76650",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://i.scdn.co/image/c32ed070fcf04ef2beaa5474e8705129f6c6a0a0",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/64c3e8e485ff34c0509c5b292f96196bc3035096",
            "width": 64
        }
        ],
        "name": "World Wide Open",
        "release_date": "2009-01-01",
        "release_date_precision": "day",
        "total_tracks": 11,
        "type": "album",
        "uri": "spotify:album:5p3mCmG9a2zkpquEixdEHD"
    },
    "artists": [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/03a5eVjzFyQlR4XyVSwt4t"
        },
        "href": "https://api.spotify.com/v1/artists/03a5eVjzFyQlR4XyVSwt4t",
        "id": "03a5eVjzFyQlR4XyVSwt4t",
        "name": "Love and Theft",
        "type": "artist",
        "uri": "spotify:artist:03a5eVjzFyQlR4XyVSwt4t"
    }],
    "disc_number": 1,
    "duration_ms": 229760,
    "explicit": false,
    "external_ids": {
        "isrc": "USL2S0920649"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/3x5VSzCT9x9LB6uPomLZXs"
    },
    "href": "https://api.spotify.com/v1/tracks/3x5VSzCT9x9LB6uPomLZXs",
    "id": "3x5VSzCT9x9LB6uPomLZXs",
    "is_local": false,
    "is_playable": true,
    "name": "Runaway",
    "popularity": 54,
    "preview_url": null,
    "track_number": 2,
    "type": "track",
    "uri": "spotify:track:3x5VSzCT9x9LB6uPomLZXs"
},
{
    "album": {
        "album_type": "album",
        "artists": [{
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/6l3HvQ5sa6mXTsMTB19rO5"
            },
            "href": "https://api.spotify.com/v1/artists/6l3HvQ5sa6mXTsMTB19rO5",
            "id": "6l3HvQ5sa6mXTsMTB19rO5",
            "name": "J. Cole",
            "type": "artist",
            "uri": "spotify:artist:6l3HvQ5sa6mXTsMTB19rO5"
        }],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/1NfrmcXk8xNennyxQ57JcW"
        },
        "href": "https://api.spotify.com/v1/albums/1NfrmcXk8xNennyxQ57JcW",
        "id": "1NfrmcXk8xNennyxQ57JcW",
        "images": [{
            "height": 636,
            "url": "https://i.scdn.co/image/70d5d04703139de6ea3d708a489f8ffdb25855e0",
            "width": 640
        },
        {
            "height": 298,
            "url": "https://i.scdn.co/image/40d7591f750690e0b18ba7516462c4f2556a78ad",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/12c3fd510c51303af8299090d997e56f6dce69d6",
            "width": 64
        }
        ],
        "name": "Born Sinner",
        "release_date": "2013-06-14",
        "release_date_precision": "day",
        "total_tracks": 21,
        "type": "album",
        "uri": "spotify:album:1NfrmcXk8xNennyxQ57JcW"
    },
    "artists": [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/6l3HvQ5sa6mXTsMTB19rO5"
        },
        "href": "https://api.spotify.com/v1/artists/6l3HvQ5sa6mXTsMTB19rO5",
        "id": "6l3HvQ5sa6mXTsMTB19rO5",
        "name": "J. Cole",
        "type": "artist",
        "uri": "spotify:artist:6l3HvQ5sa6mXTsMTB19rO5"
    }],
    "disc_number": 1,
    "duration_ms": 314493,
    "explicit": true,
    "external_ids": {
        "isrc": "USQX91301183"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/6uslSzMm1xIuCf5p9ECEtz"
    },
    "href": "https://api.spotify.com/v1/tracks/6uslSzMm1xIuCf5p9ECEtz",
    "id": "6uslSzMm1xIuCf5p9ECEtz",
    "is_local": false,
    "is_playable": true,
    "name": "Runaway",
    "popularity": 55,
    "preview_url": "https://p.scdn.co/mp3-preview/c9523bf44d832a0e8f92b612f4fcd0bab4f05aac?cid=8f7d07368a474d83be8522127329f9a9",
    "track_number": 7,
    "type": "track",
    "uri": "spotify:track:6uslSzMm1xIuCf5p9ECEtz"
}
];

for (song in songArray) {
    q.add(songArray[song]);

}
$playlistQueue.append(q);


function nextSong(queue) {

    $playlistHistory.append(queue.first);
    queue.remove();
    $playlistCurrent.empty();
    $playlistCurrent.append(queue.first);
    console.log(queue.first().name);

}


// setTimeout(() => {

setInterval(() => {
    nextSong(q);
    // console.log("ran next song")
}, 5000);


// }, 5000);




// audio.onended=function(){
//     nextSong(q)
// };