======================================================================================================================================================
                                                                        #1
======================================================================================================================================================
1. Apa itu <NodeJS>
    - adalah JS runtime untuk membuak aplikasi yang asinkronus.
    - NodeJS bukanlah bahasa pemrograman, padahal NodeJS adalah runtime dimana kita bisa menjalankan script JS di dalamnya.
    - runtime adalah sebuah tempat dimana kita menjalankan atau mengeksekusi kode kita.
    - karena negine V8 pada JS hanya bekerja didalam browser ( hanya bisa ketika browser nyala ), maka dibuatlah NodeJS yang bisa berada di
        sistem operasi tidak lagi "hanya di dalam browser"
    - `Karakteristik` NodeJS:
        a. asynchronous & event driven
        b. non-blocking
        c. single threaded but highly scalable
        d. cross platform
        e. MIT license ( open src )
        f. memiliki NPM ( tempat menyimpan sangat banyak library )
    - `fitur` utama:
        a. mengakses file system ( tidak hanya dir pada web project )
        b. bisa mengatur buffer (binary)
        c. HTTP dan HTTPS
        d. REPL untuk mengeksekusi program node lewat terminal
        e. memiliki console
        f. bisa melakukan crypto
        g. zlib
2. <NodeJS vs PHP>
    - NodeJS
        a. runtime
        b. single-thread
        c. asynchronous
        d. berjalan di tuntime sendiri
        e. package manager menggunakan NPM
    - PHP
        a. bahasa pemrograman
        b. multi-thread
        c. synchronous
        d. web server menggunakan apache
        e. package manager menggunakan Composer
3. NodeJS cocok untuk
    - dynamic single page application (SPA) yaitu aplikasi hanya satu halaman tapi isinya secara dinamis dapat berubah" ( tdk perlu pindah halaman )
    - realtime app ( chat, game multiplayer )
    - membuat API, misal ingin membuat rest API sehingga orang lain dapat melakukan req data pada aplikasi kita
    - streaming app ( video / lagu )
    - microservices yaitu satu aplikasi besar yang di dalamnya terdapat banyak aplikasi-aplikasi
    - command line tool
    - membuat aplikasi yang teknologinya
        a. MongoDB Express React Node   *(MERN)*
        b. MongoDB Express Angular Node *(MEAN)*
        c. MongoDB Express View Node    *(MEVN)*
4. Pre Requisite
    - JS dasar ( variabel, looping, array, obj )
    - modern JS ( ES6 ) ( arrow function, destructuring, asynchronous, callback, promise, async await )


======================================================================================================================================================
                                                                #2  #3  #4  #5
======================================================================================================================================================
1. Arsitektur NodeJS
    - jika sebelumnya kita menggunakan konsep web browser
        a. *document.getElementById()*
        b. *document.getElementByClassName()*
        c. *document.querySelector()*
    - sekarang konteksnya sudah menjadi sistem operasi
        a. *fs.writeFile()* `untuk mengakses file sistem, bisa menulis file kedalam sebuah folder di file sistem`
        b. *os.platform()*
        c. *http.createServer()*
        d. *path.dirname()*
    - contoh synchronous
        <!-- <const getUserSync = require('./src/getUserSync') -->
        <const getUserSync = (id) => {
        <const nama = id === 1 ? 'adhim' : 'rahman';
        <<!-- return { id: id, nama: nama } -->
        <return { id, nama }
        <};
        <const userSatu = getUserSync(1);
        <console.log (userSatu);/>
        <const userDua = getUserSync(2);
        <console.log (userDua);
        <const halo = 'Hello World!';
        <console.log (halo);
    - contoh asynchronous
        <const getUser = ( id, callback ) => {
        <const time = id === 1 ? 3000 : 2000;
        <setTimeout(() => { const nama = id === 1 ? 'adhim' : 'rahman'; cb({ id, cb }) }, time); };
        <const userSatu = getUser(1, (hasil) => { console.log(hasil); });
        <const userDua = getUser(2, (hasil) => { console.log(hasil); });
        <const halo = 'Hello World!';
        <console.log ('selesai');
    -  Instalasi, Konfigurasi & Menjalankan
    - Node REPL ( Read - Eval - Print - Loop ) : membuat kode dan melakukan eksekusi melalui command line
    - Menjalankan File Node


======================================================================================================================================================
                                                                        #6
======================================================================================================================================================
1. NodeJS Module System
    - **penting :** bagian ini merupakan penjelasan mengenai konsep dasar pada NodeJS, dmna NodeJS menganggap setiap file sbg sebuah modul sendiri

2. Modules & Node Modules
    - Modules adalah sekumpulan kode yang dapat digunakan kembali, dengan antarmuka yang terdefinisi.
    - Node Modules adalah fungsionalitas yang simpel ataupun kompleks yang tersimpan di dalam sebuah file <js>, yang dapat kita gunakan kembali
      pada aplikasi NodeJS lewat file yang lain.
    - setiap module di dalam <NodeJS> memilki konteks-nya masing-masing, tidak bisa saling tercampur dengan modul lain pd lingkup global.
    - dimana antara 2 file terdapat suatu <function> yang di <export> dan terdapat file yang melakukan <import (require)>

3. `Tipe` NodeJS Modules
    - Core Modules          : modules yg sdh dimiliki NodeJS di dalam *library* nya. ( hanya perlu melakukan import )
    - Local Modules         : modules yg dibuat sendiri. ( perlu melakukan export dan import )
    - Third Party Modules   : modules yg dibuat orang lain, biasa disebut <NPM Modules> karena semua modul yg dibuat oleh `pihak ketiga` sudah
      dikumpul oleh NodeJS kedalam sebuah paket manager bernama <NPM>

4. <require()>
    - fungsi require mencari modul dengan **urutan** sebagai berikut:
        a. Core Modules             : terlebih dahulu mencari apakah ada core modules yg dipanggil. kalau tidak ada,
        b. File / direktori         : kemudian mencari local modules yaitu berupa `relative url`.
        c. Folder <node_modules>    : kemudian mencari kedalam folder node_modules untuk third-party modules.

5. problems
    - misal pada file A kita memiliki dua fungsi dan melakukan export <module.exports> dimana jika terdapat dua <modul.exports> pada satu file yg sama
      karena akan terjadi kontra padasaat pemanggilan menggunakan <require()> dimana semuanya terjadi duplikat sintaks.
    - maka kita perlu menambahkan property dengan penamaan bebas tapi disarankan sesuai dengan `nama function` untuk mempermudah pendefinisian
      contoh: <module.exports.{property}> === <module.exports.cetakNama = cetakNama;>.
    - dengan begitu kita hanya perlu melakukan import sekali saja dengan perwakilan nama file saja <const script = require('./script')>
      kita bisa melakukan pemanggilan object, function, variabel, dan class dengan mengarahkan pada pemanggilan saja

6. new
    - daripada melakukan export dengan cara,
        <module.exports.cetakNama = cetakNama;>
        <module.exports.PI = cetakPI;>
        <module.exports.mahasiswa = mahasiswa;>
        <module.exports.Orang = Orang;>
    - sebaiknya menggunakan, <module.exports = { cetakNama: cetakNama, PI: PI, mahasiswa: mahasiswa, Orang: Orang }>


======================================================================================================================================================
                                                            #7  #8  #9 #10 #11  #12  #13
======================================================================================================================================================
1. <NodeJS Core Modules>
    - biasakan dengan membaca dokumentasi terlebih dahulu
    - pada metode `synchronous` biasanya menggunakan <try catch>
    - pada metode `asynchronous` tidak perlu karena sudah ditangain dengan <callback>
2. <NPM> ( Node Package Manager )
    - instalasi
        a. ketik `node -v` pada terminal untuk memastikan NodeJS sudah terinstall
        b. kemudian lakukan inisiasi dengan mengetik `npm init`
        c. menginstall module `npm i(nstall) module_name`
        d. uninstall module `npm uninstall module_name`
3. Menggunakan Package NPM
4. Membuat aplikasi NodeJS sederhana <Contact App>
5. NodeJS <Web Server>


======================================================================================================================================================
                                                                        #14 #15 #16
======================================================================================================================================================
1. <NodeJS Express>
    - apa itu expressJS
        a. ExpressJS adalah `framework` untuk NodeJS yang cepat, `unopinionated` dan minimalis.
        b. ExpressJS adalah webApp `framework` yg dibuat diatas NodeJS.
        c. Menyediakan antarmuka yang minimal untuk kakas yang diperlukan dalam membuat sebuah apk web.
        d. Membantu pengelolaan data flow dari server ke aplikasi.
        e. Support: <MERN MEAN MEVN Stack>
    - Fitur ExpressJS
        a. Menangani req dengan berbagai metode HTTP dengan mudah (Routes)
        b. dapat membuat aplikasi dengan konsep <MVC (Model - View - Controller)>
        c. terintegrasi dengan `view` rendering engine, untung mengelola template ( templating engine )
        d. `middleware`
    - <Opinionated>
        a. adalah aturan-aturan/tata cara dalam membuat sesuatu dari framework tersebut ( hanya ada 1 cara tepat utk membuat sesuatu ).
    - <Unopinionated>
        a. Tidak ada aturan baku untuk membuat sesuatu ( `fleksibel` )
        b. dapat menentukan sendiri struktur aplikasi
        c. bongkar pasang `middleware`
    - Templating Engine
        a. ada sangat amat banyak templating eng yang bisa digunakan
    - `Database`
        a. Cassandra        f. MongoDB
        b. CouchDB          g. PostgreSQL
        c. LevelDB          h. MySQL
        d. Redis            i. SQL Server
        e. Oracle           j. SQL Lite
    - Menggunakan ExpressJS
       a. `npm i express` untuk menginstall modul ExpressJS
       b. `npm i -g nodemon` agar tidak perlu mengulang running server ketika ada perubahan pada `app.js`

2. <View / Template Engine>
    - Apa itu View Engine / Templating Engine
        a. adalah sebuah cara untuk mempermudah pengelolaan file statis halaman web pada palikasi
        b. didalam engine tersebut kita bisa `membuat sebuah variabel` yg nantinya akan diganti dengan nilai sebenarnya dan menampilkan dlm bentuk HTML
        c. dari express kita mengirimkan data ke dalam file view engine kemudian template engine menangkap data tersebut dan menampilkannya ke dlm sebuah variabel
        d. kita juga bisa memisahkan bagian dalam halaman website dengan `lebih mudah`
        e. `tujuan` utamanya adalah untuk mempermudah pembuatan halaman web
    - Templating Engines
        a. ada banyak macam nya, cara penggunaan kurang lebih. Penting untuk membaca dokumentasi tiap template nya.
        b. <EJS> ( Embedded JavaScript template engine )
            - penulisan sintaks simpel
            - setup untuk aplikasi express simple
            - eksekusi cepat
            - easy debugging ( mudah dalam mendebug / mencari kesalahan saat error )
            - active development
            - awalnya dibuat oleh pembuat ExpressJS

3. <EJS>
    - Instalasi
        a. `npm i ejs`
        b. semua file HTML dimasukkan kedalam folder views
        c. semua file <HTML> diganti menjadi ekstensi <ejs>
    - Fitur
        a. bisa membuat Control Flow <% %>
        b. includes ( dapat dengan mudah mengelola tampilan pada template halaman html )
        c. dll

4. <Express Middleware>
    - Definisi
        a. adalah sebuah `software` yang menghubungkan software atau aplikasi lain. Sebuah software yg berada diantasa `OS` dan `Aplikasi`
        b. Ada pada:
            - `database`
            - web server
            - game engine
            - web application
        c. aplikasi Express sebenarnya berisi serangkaian pemanggilan `fungsi Middleware`. Express menganggap apapun yg diproses setelah user
            melakukan <request> dan sebelum user menerima <respone> itu adalah Middleware. Jadi Middleware dibuat menjadi sebuah function
        d. <Function Middleware> adalah sebuah fungsi yang memiliki akses ke object request (<req>), object response (<res>), dan fungsi Middleware berikutnya (<next>). Fungsi middleware dapat melakukan:
            - mengeksekusi kode
            - melakukan perubahan pada `request dan reponse oject`
            - mengakhiri `siklus request dan response`
            - memanggil fungsi middleware berikutnya yang ada didalam tumpukan (<stack>)
    - ada tiga:
        a. `User-defined middleware` ( middleware yg kita bikin sendiri )
            - Application-level middleware
            - Router-level middleware
            - Error-handling middleware
        b. `Built-in middleware` ( sdh tertanam di dalam Express, berfungsi utk melakukan sesuatu secara spesifik )
        c. `Third-party middleware` ( yg sdh dibuat oleh orang lain, di install melalui <npm> sebagai middlewaware. bukan module )
    - lets code

======================================================================================================================================================
                                                                        #17 #18 #19
======================================================================================================================================================
1. <NodeJS Express Contact App>
======================================================================================================================================================
                                                                        #20 #21 #22
======================================================================================================================================================
1. <NodeJS MongoDB>


======================================================================================================================================================
                                                                        #23 #24
======================================================================================================================================================
1. <NodeJS MongoDB Contact App>