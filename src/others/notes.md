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


<!-- TODOLISTS -->



<!-- NOTES -->
