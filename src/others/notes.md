*/ public /*
|
|----- / css /
|      |
|      |----- input.css ( style untuk semua file utama )
|      |
|      |----- output.css ( style default tailwind.css )
|      |
|      |----- profile.css ( style khusus profile ejs )
|
|----- / images /
|      |
|      |----- liked.png ( image untuk playlist dan album sementara sebelum tambah column insert )
|      |
|      |----- logo.png ( image untuk header web icon )
|      |
|      |----- nothing.png ( image untuk playlist dan album yang tidak tersedia )
|      |
|      |----- SPOTITIP.png ( image header row / banner )
|
|----- / js /
|      |
|      |----- createAlbum.js ( 0% WIP, sama seperti create playlist )
|      |
|      |----- createModal.js ( toggle class modal with display none and block )
|      |
|      |----- createPlaylist.js ( 50% WIP, db aman, error saat pembuatan display playlist, bisa jadi karena /createPlayilst di app.js )
|      |
|      |----- loginErr.js ( URL search params, belum digunakan )
|      |
|      |----- mainContent.js ( toggle active semua button main content: all, user, artist, song, album, playlist )
|      |
|      |----- mysql.js ( query untuk test connection db spotitip )
|      |
|      |----- profile.js ( 0% WIP, untuk info akun artist/user dan logout )
|      |
|      |----- seacrhButton.js ( 0% WIP, untuk mencari user, artist, song ,playlist, album berdasarkan title dan name )
|      |
|      |----- sideBottom.js ( toggle active button playlist dan album )
|      |
|      |----- sideTop.js ( 0% WIP, untuk fitur search dan home juga )
|      |
|      |----- SignIn.js ( signin ke signup dan handlelogin )
|      |
||||||||----- SignUp.js ( skip )



*/ src /*
|
|----- / others /
|      |
|      |----- nodejs.md
|      |
|      |----- notes.md
|      |
|      |----- React.md
|
|----- / php /
|      |
|      |----- signIn.php
|      |
|      |----- signUp.php
|      |
||||||||----- test.php


*/ utils /*
|      
|----- / callTable.js ( async function untuk mengambil data user, artist, playlist, album, song dari database spotitip )
|      
|----- / checkCredentials.js ( cek login===exist.datas, duplicate playlists, duplicate albums, duplicate songs )
|      
|----- / generateID.js ( generate and keep id user, artist, playlist, album, song )


*/ views /*
|
|----- / layouts /
|      |
|      |----- album-popular.ejs
|      |
|      |----- artist-popular.ejs
|      |
|      |----- asideBottom.ejs
|      |
|      |----- asideTop.ejs
|      |
|      |----- acreateModal.ejs
|      |
|      |----- mainContent.ejs
|      |
|      |----- mainHeader.ejs
|      |
|      |----- newest-song.ejs
|      |
|      |----- newest-user.ejs
|      |
|      |----- playlist-popular.ejs
|
|----- / partials /
|      |
|      |----- error-messages.ejs
|
|----- / index.ejs
|
|----- / mainArtist.ejs
|
|----- / mainUser.ejs
|
|----- / profile.ejs
|
|----- / signup.ejs

*/ app.js*

======================================================================================================================================================
                                                                                                                                                    =
======================================================================================================================================================

<!-- CONDITIONS -->
- <signin>
- client memasukkan email dan password *( check duplikat db.user dan db.artist )* ✅
        - jika tidak ada, goto *login?error=account-not-found* send `Email atau password anda mungkin salah, silahkan ulang.`. Goto */signup* ✅
        - jika ada, maka periksa apakah client adalah user atau artist ( mengecek value yang tadi ) ✅
                - jika user,    goto */main-user* ✅
                - jika artist   goto */main-artist* ✅

- <signup>
- client memasukkan username, email, password, dan memilih register as user atau artist ✅
        - mengecek duplikat *( check db.user dan db.artist )*, jika ada */signup?error=${registerAs}* ✅
        - jika registerAs === user, *( push name, email, password to db.user )*, Goto */main-user* ✅
        - jika registerAs === artist, *( push name, email, password to db.artist )*, Goto */main-artist* ✅

- <main-user>
- user memasuki dashboard main ✅
- sidetop : fitur home dan search *cooming soon* ✅
- sidebottom  : ✅
        - create playlist : menekan tombol --> memasukkan title dan description --> create *(push db.playlist)* *(push db.user_playlist_create)* ✅
        - show playlists: menekan tombol untuk melihat playlist yang dibuat *(call db.user_playlist_create)* ✅
                - soon akan ada fitur untuk melihat playlist yang difollow *(call db.user_playlist_follow)* ✅
        - show albums   : menekan tombol albums untuk melihat album yang difollow *(call db_user_album_follow_)* ✅
- mainHeader  :
        - user menekan tombol profile, goto *main-user/pofile* ✅
- mainContent :
        - user menekan tombol ( all / user / artist / song / playlist / album ) ✅
                - jika menekan tombol all  === show all sections ✅
                - jika menekan tombol user === show users section ✅
                - jika menekan tombol artist === show artists section ✅
                - jika menekan tombol album === show albums section ✅
                - jika menekan tombol playlist === show playlists section ✅
                - jika menekan tombol songs === show songs section ✅
                - jika data tidak ada === show data none ✅
        - user menekan titik tiga pada item ( user / artist / song / playlist / album ) ✅
                - jika menekan pada item user : ✅
                        - user like song *( push db.user_song_liked )* ✅
                        - user add song to playlist *( push db.song_playlist_contains )* ✅
                                - soon user bisa hapus song yang ada di playlist 🚀
                - jika menekan `love` pada item artist, maka user follow artist *( push db.user_artist_follow )* ✅
                - jika menekan `love` pada item album, maka user follow album *( push db.user_album_follow )* ✅
                - jika menekan `love` pada item playlist, maka user follow playlist *( push db.user_playlist_follow )* ✅
        - searchBar :
                - user dapat melakukan pencarian berdasarkan title / name *( call db )* ✅

<main-artist>
- artist memasuki dashboard main ✅
- sidetop : fitur home dan search *cooming soon* ✅
- sidebottom  : ✅
        - create album : menekan tombol --> memasukkan title dan description --> create *(push db.album)* *(push db.album_artist_has)* ✅
        - show albums: menekan tombol untuk melihat album yang dibuat *(call db.album_artist_has)* ✅
- mainHeader  :
        - artist menekan tombol profile, goto *main-artist/pofile* ✅
- mainContent :
        - artist menekan tombol ( all / user / artist / song / playlist / album ) ✅
                - jika menekan tombol all  === show all sections ✅
                - jika menekan tombol user === show users section ✅
                - jika menekan tombol artist === show artists section ✅
                - jika menekan tombol album === show albums section ✅
                - jika menekan tombol playlist === show playlists section ✅
                - jika menekan tombol songs === show songs section ✅
                - jika data tidak ada === show data none ✅
        - searchBar :
                - artist dapat melakukan pencarian berdasarkan title / name *( call db )* ✅

- <profile>
- user:
    - user dapat melihat informasi akun berupa ( name, email, password, follwer, following ) *(call db.user)* ✅
    - melihat playlist yg dibuat dan lagu isinya *( db.user_playlist_create )* & *( db.song_playlist_contains )* ✅
    - melihat artist yang diikuti *( db.user_artist_follow )*  ✅
    - melihat playlist yang diikuti *( db.user_playlist_follow )* ✅
    - melihat album yang diikuti *( db.user_album_follow )* ✅
    - melihat lagu yang disukai *( db.user_song_liked )* ✅
- artist:
    - artist dapat melihat informasi akun berupa ( nama, email, password, followers ) *( call db.artist )* ✅
    - melihat album yang dimiliki dan lagu isinya *( db.album_artist_has )* dan *( db.song_album_contains )* ✅
    - melihat lagu yang dimiliki *( db.song_artist_sing )* ✅

<!-- NOTES -->
- insert data entitas ( push ) ✅
- insert data relasi ( push ) ✅

- select data entitas ( call/show ) ✅
- select data relasi ( call/show ) ✅

- change data entitas 🚀
- change data relasi 🚀

- delete data entitas 🚀
- delete data relasi 🚀