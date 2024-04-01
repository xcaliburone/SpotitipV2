========================================================================================================================================================
----------------------------------------------------------------- /////// ------------------------------------------------------------------------------
========================================================================================================================================================

1. DEFINITION
    1.1. React adalah library javascript untuk membuat antarmuka pengguna ( UI ) yang interaktif.
    1.2. Antarmuka Pengguna ( User Interface ) adalah elemen-elemen pada layar yang dapat dilihat dan berinteraksi dengan user.
    1.3. React disebut *library* karena menyediakan fungsi-fungsi untuk membangun UI, tapi terserah dev untuk menggunakan fungsinya.
    1.4. React relatif *un-opinionated* ( cara penggunaannya tidak terlalu diatur ).
    1.5. hal ini menyebabkan ekosistem-nya berkembang dan memiliki banyak tools pihak ketiga.
    1.6. disebut react karena fitur utamanya adalah *reactive*, yang artinya kemampuan untuk bereaksi atau merespon secara dinamis ketika ada
        interaksi atau perubahan data.

2. Transisi Javascript ke React
    2.1. bagaimana browser meng-interpretasi code kita untuk menghasilkan UI yang interaktif ![Alt text](img/capture_20230803220511806.bmp).
    2.2. DOM adalah representasi object dari elemen HTML pada halaman web.
    2.3. DOM Manipulation yaitu kita bisa mengubah tampilan / UI yang ada di halaman kita berdasarkan codingan html nya. Jadi kita bisa menambah,
        mengubah, dan menghapus tanpa lewat coding HTML kita bisa memanipulasi menggunakan JS.
        2.3.1. misal kita mempunyai struktur html seperti ini ![Alt text](img/capture_20230803222330260.bmp).
        2.3.2. kemudian kita dampat menambahkan elemen menggunakan JS ![Alt text](img/capture_20230803222517241.bmp).
        2.3.3. Jadi *HTML* merepresentasikan konten halaman awal kemudian *DOM* merepresentasikan konten halaman yg telah diperbarui.
        2.3.4. mengubah *DOM* menggunakan JS 'polos' (vanilla js)(tdk memakai fw, library, dll) memang terlihat sakti, tapi nulisnya ribet.
        2.3.5. dengan menggunakan cara penulisan tadi, waktu yang dibutuhkan akan lebih banyak. karena ini termasuk *imperative*.
    2.4. Imperative dan Declarative
        2.4.1. Imperative programming menuliskan langkah demi langkah bagaimana sesuatu harus dilakukan. Bagaikan memberi instruksi pada koki
                di restoran saat kita ingin memesan pizza.
        2.4.2. Declarative programming menuliskan apa yang akan dihasilkan. Bagaikan saat memesan pizza sesuai menu tanpa menghiraukan
                langkah demi langkahnya.
        2.4.3. React merupakan sebuah *UI Library* yang *declarative*.

3. Mulai Bekerja dengan React
    3.1. Untuk menggunakan React, kita butuh `2 script react` yang bisa kita panggil lewat unpkg.com (sgt tdk disarankan tapi cocok utk pemula).
        3.1.1. panggil *react* sebagai library utama.
        3.1.2. panggil *react-dom* agar kita bisa menggunakan method-method untuk memanipulasi DOM.
    3.2. pergi ke dokumentasi resmi react di [https://react.dev/] --> Learn --> Installation --> Try React locally --> download this HTML page --> copy.
    3.3. buat [index.html] --> buat [div#root] --> buat [script] bertipe (text/javascript) berisi `const container = document.getElementById('root');`.
    3.4. masukkan [<script src="https://unpkg.com/react@18/umd/react.development.js"></script>] ke dalam tag [head].
    3.5. masukkan [<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>] ke dalam tag [head].

4. Menyiapkan Aplikasi
    4.1. Untuk menyiapkan aplikasi react, kita butuh method *ReactDOM.createRoot()* yang diambil dari package *react-dom* yg kita panggil tadi.
    4.2. Method tersebut digunakan sebagai `wadah` untuk aplikasi.
    4.3. Kita juga butuh method *render* untuk menampilkan elemen [h1] kita.
    4.4. pada tag [script] tambahkan [const root = ReactDOM.createRoot(container); root.render(<h1>Belajar React Nih Dekk 🚀</h1>);].
    4.5. lalu kemudian jalankan html menggunakan *live server*.
    4.6. kita akan menemukan error pada console dimana react tidak mengenal [h1] karena pada *method render* h1 itu bukan javascript melainkan jsx.
        dan secara default browser tidak mengenali JSX. maka,
    4.7. kita butuh sebuah compiler yang bisa menerjemahkan *JSX* jadi sintaks *Javascript biasa*.
    4.8. kita akan menggunakan compiler bernama *babel* sebagai `penerjemah` nya.

5. Menambahkan babel ( babeljs.io )
    5.1. Tambahkan *script babel* pada project kita lewat *unpkg*.
    5.2. Ubah type pada script menjadi `text/jsx` bisajuga `text/babel` untuk menginformasikan pada babel kita akan mengubah JSX menjadi JS.
    5.3. masukan [<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>] ke dalam tag  [head].
    5.4. Aplikasi react sudah berhasil dibuat 🎉🎉🎉.
    5.5. kesimpulannya menggunakan react dapan mempersingkat manipulasi DOM.

6. JSX
    6.1. JSX adalah ekstensi sintaks untuk javascript yang dapat mendeskripsikan UI dengan sintaks seperti HTML.
    6.2. Meskipun masih ada cara lain untuk membuat komponen, kebanyakan dev react menggunakan JSX.
    6.3. Sintaks JSX terlihat seperti HTML, tapi `lebih strict` dalam penulisannya dan bisa menampilkan informasi yg dinamis (html itu statis).
    6.4. Untuk penulisannya kita harus ingat 3 aturan JSX:                      [https://react.dev/learn/writing-markup-with-jsx]
        6.4.1. JSX pada saat di *render* harus selalu mengembalikan satu buah elemen tidak boleh lebih.
                    6.4.1.1. karena kita pasti akan banyak membuat elemen-elemen. kalau pakai cara tadi pasti error.
                    6.4.1.2. maka kita perlu membungkus semua elemen" tersebut kedalam satu elemen lagi.
                    6.4.1.3. elemen tersebut bernama *JSX Fragment* dengan tampilan [<>...</>].
        6.4.2. Harus selalu menutup semua tag nya.
                    6.4.2.1. inilah mengapa JSX itu `strict` karena semua elemen wajib ditutup tag nya. bagaimana dengan tag tunggal?.
                    6.4.2.2. pada HTML misalnya terdapat tag <img> tag ini sama sekali tunggal dan tidak ada penutupnya.
                    6.4.2.3. pada JSX kita perlu melakukan *self closing* pada tag img menjadi <img />.
        6.4.3. Gunakan *camelCase* untuk [atribut]
                    6.4.3.1. contohnya : <!-- <p onclick={e => {alert('ok!')}}>Belajar React itu Mudah</p> -->.
                    6.4.3.2. pada html hal tersebut biasa saja akan tetapi pada JSX itu adalah error maka kita perlu camelCase pada atribut.
                    6.4.3.3. contohnya : <!-- <p onClick={e => {alert('ok!')}}>Belajar React itu Mudah</p> -->.
                    6.4.3.4. dan juga ada beberapa atribut yang berubah namanya.
                    6.4.3.5. contohnya : <!-- <h1 class="ohayou">lorem ipsum palakau lorem</h1> -->.
                    6.4.3.6. pada JSX tidak boleh karena akan bentrok dengan class dari Javascript, maka <!-- <h1 className="ohayou">lorem</h1> -->.

7. PREREQUISITE
    7.1. Materi yang harus dikuasai :
        7.1.1. HTML & CSS.
        7.1.2. Javascript Fundamentals.
        7.1.3. DOM.
        7.1.4. Moden Javascript (ES6).
                    7.1.4.1. ES6 Variables ( let & const ).
                    7.1.4.2. Functions & Arrow Functions.
                    7.1.4.3. Objects & Classes.
                    7.1.4.4. Arrays & Arrays Methods.
                    7.1.4.5. Destructuring ( memecah object & array menjadi variable ).
                    7.1.4.6. Template Literals.
                    7.1.4.7. Ternary Operators.
                    7.1.4.8. ES Modules & Import / Export Syntax.
        7.1.5. Git & CLI ( Command Line Interface ).
        7.1.6. Package Manager ( NodeJs + NPM ).
    7.2. Editor Setup.
        7.2.1. Code Editor : Virtual Studio Code.
        7.2.2. Linter : Linter.
        7.2.3. Browser Extension : React Developer Tools.

8. Konsep-konsep Utama pada React
    8.1. Core Concepts.
        8.1.1. Components.
                    8.1.1.1. Membuat UI menggunakan komponen.
                                - UI bisa dipecah menjadi bagian-bagian kecil yang disebut dengan komponen.
                                - dgn komponen kita bisa membuat potongan kode yang mandiri dan bisa digunakan kembali.
                                - Anggap saja sebagai `blok-blok lego`, dimana kita bisa menyusun potongan" kecil untuk membuat struktur besar.
                                - Jika kita ingin mengubah sebuah elemen pada UI, kita hanya perlu mengubah komponen nya saja.
                                - `komponen` pada react pada dasarnya adalah `function` pada Javascript.
                                - dimana `nama function` harus ditulis diawali dengan huruf besar.
                                - function akan mengembalikan nilai elemen UI yang akan dijadikan komponen, ditulis dgn JSX.
                                - dipanggil sebagai `tag HTML` saat di-render.
                                - contohnya : ![Alt text](img/capture_20230806154747001.bmp).
                    8.1.1.2. Membuat Komponen yang Bersarang
                                - sebuah aplikasi biasanya di dalamnya terdapat banyak komponen.
                                - kita bisa menyimpan sebuah komponen di dalam komponen lain.
                                - misalnya kita mau memasukkan komponen `Header` tadi kedalam komponen `HomePage`.
                                - caranya yaitu kita buat `function` untuk `setiap komponen` yang akan kita buat.
                                - contohnya : ![Alt text](img/capture_20230806155116895.bmp).
                    8.1.1.3. Menggunakan Kembali Komponen
                                - kita bisa menggunakan komponen berulang-ulang dengan `menuliskan ulang` tag nya kembali.
                                - contohnya : ![Alt text](img/capture_20230806155945854.bmp).
                                - bagaimana jika kita ingin menggunakan komponen yang sama tapi `informasinya berbeda`. Lihat next materi!!
        8.1.2. Props
                    8.1.2.1. Menampilkan Data Menggunakan Props
                                - didalam HTML biasa, kita bisa mrnggunakan atribut utk mengubah perilaku dari sebuah elemen.
                                - contohnya : atribut src pada elemen img, bisa mengubah sumber gambar yang akan ditampilkan.
                                - mirip seperti itu, kita juga bisa mengirimkan `properti` sebagai informasi utk sebuah `komponen` disebut `props`.
                                - `props` tersebut ditangkap sebagai `object` saat komponen dibuat.
                    8.1.2.2. Menampilkan Tulisan Berbeda untuk <Header />
                                - misal kita panggil komponen <Header /> dua kali, tapi setiap komponen punya `props author` dgn `nilai berbeda`.
                                - maka `author` tersebut akan ditangkap / dikirim ke parameter `props` yang berbentuk `objek`.
                                - sehingga kita bisa panggil di dalam JSX sebagai `properti dari objek`.
                                - contohnya : ![Alt text](img/capture_20230806160854719.bmp).
                                - kurung kurawal `{}` di gunakan utk masuk ke dalam script JS pada saat kita lagi ada di JSX.
                                - pemberian nama pada props juga bebas.
                    8.1.2.3. Props Refactor
                                - kita dapat menggunakan refactor pada props kita agar nulisnya lebih rapih.
                                - gunakan `desctructuring` supaya langsung memanggil nama props atau properti nya.
                                - gunakan `ternary operator` ketika kita mau bikin nilai default pada props nya.
                                - contohnya : ![Alt text](img/capture_20230806161535376.bmp).
                                - dengan `desctructuring` yang awalnya *function Header(props) {}* menjadi *function Header({name}) {}*.
                                - *name ? name : 'Broo'* if `name` ada isinya, maka pakai `nilai name` tersebut, else kasih nilai default `Broo`.
                    8.1.2.4. Menampilkan Elemen Menggunakan Pengulangan
                                - sangat umum ketika kita ingin `menampilkan banyak data` menggunakan `pengulangan`.
                                - salah satu caranya adalah dengan menggunakan `method pada array`.
                                - untuk memanipulasi data dan menampilkan elemen UI yang identik scr style, tapi `berbeda informasinya`.
                                - untuk contoh kali ini, kita akan menggunakan *array.map()*.
                                - contohnya : ![Alt text](img/capture_20230806163834545.bmp)
                                - kita punya sebuah variable bernama `students` yang berupa array. memiliki 3 buah data mahasiswa.
                                - jika kita ingin menampilkan data nya kedalam elemen `<li></li>` kita bisa menggunakan map.
                                - *students.map((student) => ( <li>{student}</li> ))* bacanya gini,
                                - panggil arraynya `students`, terus kita map, ambil elemen didalamnya `student`, pakai arrow function, tampilkan
                                    setiap data / elemen pada arraynya `{student}`.
                                - hasilnya berhasil tampil, tetapi terdapat *error* pada bagian *console*.
                                - jadi, ketika ktia bikin `list` atau melakukan `looping` pada elemen yang sama, `setiap elemen` tadi harus punya  
                                    `properti key` yang memiliki `nilai unik / unique key`.
                    8.1.2.5. Unique Key
                                - *warning* tadi menjelaskan bahwa ada prop `key` yang hilang.
                                - karena React butuh sesuatu untuk `menandai sebuah elemen` dengan `nilai yg unik`.
                                - React harus tau elemen mana yang berubah, karena React hanya melihat elemen, bukan isinya.
                                - di kasus ini, kita bisa menggunakan `nama student` sebagai key, karena kebetulan nama student tidak ada yg sama.
                                - tapi pada suatu kasus, kemungkinan kita dapat menemukan ketika ada `nama setudent` yang sama.
                                - maka, `sebaiknya` gunakan sesuatu yang sudah bisa dipastikan `unik`.
                                - contohnya : ![Alt text](img/capture_20230806164710975.bmp).
        8.1.3. State
                    8.1.3.1. Menambah Interaktivitas dengan State
                                - Banyak hal di halaman kita bisa `berubah` karena ada `interaksi` yang dilakukan oleh `user`.
                                - seperti, user ngeklik tombol, memasukkan input di kolom inputan, bahkan menggerakkan mouse.
                                - hal tersebut adalah sebuah `event` yang dapat membuat keadaan berubah di halaman kita.
                                - pada React, data yang `berubah seiring waktu` disebut dengan `state`.
                                - kita bisa `menambahkan state` untuk komponen manapun, dan nilai dari state dapat `diubah ketika dibutuhkan`.
                                - untuk menambahkan interaktivitas pada elemen, React menggunakan *State* dan juga *Event Handler*.
                    8.1.3.2. State dan Hooks
                                - misalnya kita akan membuat tombol yang jika diklik, akan menambahkan jumlah angka sesuai dgn brp kali tombol diklik.
                                - React punya serangkaian `function` yang disebut *Hooks*, yg memungkinkan kita `menambahkan login` pd komponen kita.
                                - Salah satu Hooks yang bisa digunakan utk `mengelola state` adalah *setState()*, yang mengembalikan nilai berupa 
                                    `array`, dan bisa kita akses menggunakan tektik `destructuring`.
                                - elemen pertama pada array (hasil kembaliannya) itu adalah `nilai statenya`.
                                - elemen kedua merupakan `function` yang bertugas utk mengubah nilai elemen pertama tadi.
                                - jadi, yang satu nilai-nya yg mungkin berubah, yg satu fungsi utk ngubah nilainya. ada dua dan selalu berpasangan.
                                - `nama function` boleh apa saja, tapi biasanya diawali dengan `set` lalu nama nilai statenya.
                                - misal, nama state nya likes, maka nama function nya adalah setLikes.
                                - contohnya : *const [likes, setLikes] = React.useState();*
                                - kita punya var likes, dan fungsi setLikes yg ditulis menggunakan `desctructuring`.
                                - kemudian kita panggil Hooks nya `React.useState()` ini mengembalikan array langsung ditangkap pakai destructuring
                                    , ambil variable nya, ambil function nya.
                                - kita juga bisa `memberi nilai awal` pada nilai statenya, dengan mengisi argumen pada useState().
                                - contohnya : *const [likes, setLikes] = React.useState(0);*
                                - akan menentukan bahwa nilai awal var likes adalah `0`. dan bisa diubah menggunakan setLikes.
                    8.1.3.3. Set Updater Function
                                - `setLikes` disebut Set Updater Function yaitu sebuah function yg bisa mengupdate nilai dari var `state`.
                                - utk `menjalankan function` yg mengubah statenya, kita bisa panggil didlm `sebuah function lain` didlm komponen kita.
                                - misal kita mau mengubah `nilai likes agar bertambah satu` tiap tombol diklik, dan akan kita lakukan dalam
                                    function *handleClick()*.
                                - ketika tombol diklik, panggil function bernama handleClick(), didalam handleClick() kita panggil setLikes.
                    8.1.3.4. Event Handler
                                - terakhir, tinggal membuat `tombol` untuk `menangani event`-nya.
                                - menulis `nama event` harus menggunakan `camelCase`.
                                - tampilkan data `likes` sebagai text di dalam tombolnya : *<button onClick={handleClick}> Like ({likes}) </button>*
                                - contohnya : ![Alt text](img/capture_20230806172842817.bmp).
9. Now What
    9.1. Bagaimana React Bekerja?
        9.1.1. Render & Commit
        9.1.2. Virtual DOM
    9.2. Bagaimana Mengelola State?
    9.3. Bagaimana Menggunakan Context?
    9.4. Memahami apa itu Lifecycle?
    9.5. Bagaimana Menggunakan Hooks?
    9.6. ............................

10. Tugas Latihan
    - membuat simple counter
    - terdapat tombol +, tombol -, dan tombol reset
    - terdapat satu elemen ditengah untuk menunjukkan angka
    - coba buat hanya 2 buah komponen, satu komponen button (bikin jadi sebuah komponen yg memiliki props berbeda), satu komponen text.
    - tambahan :
        - tidak bisa mengurangi dibawah 0, alias nilai terkecil 0
        - tombol +, hanya maksimal sampai angka 9 ketika ke-10 akan muncul `done!`
        - tombol -, hanya maksimal sampai angka 0 ketika dibawah 0 akan muncul `done!`
        - ketika angka 0, tombol `reset` tidak bisa ditekan
        - ketika angka jadi done!, tombol + dan - tidak bisa ditekan.

========================================================================================================================================================
----------------------------------------------------------------- /////// ------------------------------------------------------------------------------
========================================================================================================================================================

1. Instalasi dan Konfirgurasi
    - sebelumnya kita memanggil script React menggunakan CDN dan menyimpan syntax nya di halaman HTML yang sama.
    - kali ini kita akan menggunakan *vitejs*.
    - pertama kita perlu menginstall *Node.js*.
    - untuk memeriksa apakah node.js sudah terinstall atau belum, buka terminal kemudian ketik `node -v`.
    - kemudian install `pnpm` menggunakan `npm`, pada terminal ketik `npm i(nstall) -g(lobal) pnpm`.
    - clear screen menggunakan command `cls`.
    - kemudian pada terminal ketik, `pnpm create vite@latest`
    - kemudian isi `project name:` nya
    - pada `select a framework :` pilih `React`
    - pada `select a variant :` pilih `JavaScript`
    - selanjutnya kita masuk ke folder nya, ketik `cd (project name + tab)`
    - ketika menemukan error maka : ![Alt text](<img/Screenshot (2178).png>)
    - kemudian ketik `pnpm i` untuk menginstall semua package
    - ketik `ls` untuk melihat apakah semua sudah terinstall (node_modules, public, src)
        ![Alt text](<img/Screenshot (2179).png>) dan ![Alt text](<img/Screenshot (2180).png>)
    - jika sudah saatnya `code .`

2. Menjalankan server
    - menjalankan server tidak lagi menggunakan `live server` tapi pada terminal ketik `pnpm run dev`.
    - kalau berhasil, aplikasi akan berjalan pada local server menggunakan link yang telah diberikan.
    - itu ada versi development nya yang ada di komputer kita.
    - suatu saat misalkan aplikasi sudah selesai yang dideploy ke server itu bukan script kita yg itu, kita harus melakukan proses build sehingga
        semua syntax React, JSX, dll itu diterjemahkan ke HTML, CSS, dan JS yang bisa dibaca. Itulah tujuan dari Build Tools.
    - anggap aplikasi / react kita sudah selesai 
    - selanjutnya kita kita kembali ke `terminal`
    - matikan terminal nya, lalu tekan `ctrl + c` untuk mematikan server nya
    - kemudian ketik `pnpm run build`
    - maka akan dibuatkan semua file-file yang dibutuhkan
    - jadi yang akan di `deploy ke server` bukan lagi *React* nya melainkain folder bernama *dist* yang sudah diterjemahkan dan sudah diminify.
    - bagaimana cara menjalankannya kenapa tidak bisa pakai live server?
    - karena sebelumnya `workspace pada VSCode` kita yaitu `belajar-react`
    - jadi kita perlu mengubah workspace menjadi berfokus pada folder `dist` saja sebagai root-nya.
    - maka inilah aplikasi react yang sudah di build dan siap di deploy ke server.

3. Membuat Tic Tac Toe
    3.1. Persiapan
            3.1.1. Setup react seperti biasa
    3.2. Membuat Papan Permainan
    3.3. Menambah Pemain Lawan
    3.4. Menentukan Pemenang
    3.5. Menambahkan FItur `Time Travel`
    3.6. Refactor

========================================================================================================================================================
----------------------------------------------------------------- /////// ------------------------------------------------------------------------------
========================================================================================================================================================

1. Component
    1.1. aplikasi react terbuat dari komponen-komponen
    1.2. komponen pada react pada dasarnya adalah *function pada javascript / JSX*.
    1.3. komponen adalah bagian dari UI yang memiliki logika dan tampilannya sendiri.
    1.4. untuk membuat komponen itu bisa sekecil tombol atau sebesar seluruh halaman

2. Ukuran Component
    2.1. komponen bisa sangat kecil dan sangat besar, masing-masing memiliki kelebihan, kekurangan, dan karakteristiknya masing"
    2.2. jika suatu komponen dibuat terlalu besar maka dia akan memiliki:
            - banyak tanggung jawab
            - state dan props yang akan dikelola
            - sulit untuk digunakan kembali (reuse)
            - code menjadi kompleks
    2.3. jika suatu komponen dibuat terlalu kecil yang berarti semua elemen pada halaman dijadikan komponen:
            - terlalu banyak komponen
            - code menjadi membingungkan
            - code menjadi terlalu abstrak
    2.4. maka kita perlu mencari *keseimbangan* nya
            - kita bisa coba mengelompokkan beberapa elemen yang memiliki perilaku / fungsionalitas yang sama
            - kita bisa coba pecah, dengan membuat komponen besar terlebih dahulu kemudian kita pecah-pecah sesuai dengan peruntukannya
            - maka kita membutuhkan skill untuk *memecah* UI menjadi component
    2.5. tips dalam membuat komponen
            - pisahkan UI secara logis, antara content dan layout
            - pikirakan reusability     : ketika kita sudah bisa memisahkan layout dan content. misal button adalah layout dan didalamnya kontennya
              dapat berupa icon, tulisan, warna. kita bisa bikin button yang `sama` tapi content nya berbeda-beda. maka komponen satu tapi kita
              bisa berikan props atau perilaku yang berbeda
            - perhatikan kompleksitasnya    : jangan sampai tujuan kita `reusability` malah kode nya menjadi kompleks
            - perhatikan gaya dan kebiasaan coding kita/tim
    2.6. pertanyaan ketika menemukan sebuah komponen
            - apakah di dalam komponen terdapat 'bagian' konten atau layout yang bisa dipisahkan?
            - apakah mungkin untuk digunakan kembali?
            - apakah komponen melakukan banyak hal?
            - apakah terlalu bergantung pada banyak props?
            - apakah JSX nya jadi terlalu kompleks?
            + jika jawabannya *iya*, maka kemungkinan kita `butuh komponen baru`

3. Eps 5 :
    3.1. lakukan proses instalasi
            - install dan setup seperti biasa
            - hapus [index.css]
            - hapus semua isi dari [App.jsx], ganti dengan yg di github 
            - hapus semua isi dari [App.css], ganti dengan yg di github
            - pada [main.jsx] hapus import './index.css'
            - sudah ada aplikasi sederhana
            - pada kasus diatas, banyak elemen menjadi satu. tugas kita yaitu memecah menjadi beberapa komponen
    3.2. Kategori Komponen
            - Stateless / presentational component
                    + tidak memiliki state didalamnya.
                    + mendapat data dari menerima props untuk menampilkan data / konten. ( mengambil state dari komponen lain lalu diterima menggunakan prop )
                    + biasanya komponen kecil dan reusable.
                    + `contoh: func Logo, func Setlist`
            - Stateful component
                    + komponen yang mempunyai state / state dibikin dikomponen ini.
                    + bisa juga dibuat reusable.
                    + `contoh: func Search`
            - Structural component
                    + berperan untuk membuat truktur aplikasi ( layout, screen, pages ).
                    + biasanya komponen ini digunakan saat kita menggabungkan banyak komponen lain / dihasilkan dari komposisi.
                    + berukuran besar dan biasanya non-reusable.
                    + `contoh: func Main, func App`
    3.3. Masalah Pada Component
            - Prop Drilling
                    + pada saat kita menaruh properti ke sebuah komponen berulang" padahal ada komponen yang bahkan tdk membutuhkan data dari props itu
                    + dimana kita punya *state setlists* pada `Main.jsx` dan mau digunakan oleh `Search-Result` sedangkan dia parents nya yaitu `NavBar.jsx` merupakan **siblings** dari `Main.jsx` dan tidak bisa diwariskan karena bukan **children** nya.
                    + maka kita akan gunakan *Lifting State Up*.
                    + jadi *state setlists* harus kita naikkan keatas yaitu ke `App.jsx`.
                    + setelah menaikkan *state setlists* jangan lupa untuk melakukan proses pengiriman dan penangkapan seperti biasa.
                    + maka semuanya bisa memakainya, tapi belum ke pencapaian masalah.
                    + selanjutnya kita akan kirimkan menuju `func NumResult`.
                    + tapi itu tidak akan terjadi secara simsalabim langsung to the point ke funtion tersebut.
                    + kita perlu `mengirim` melalui parent ke parent ke parent nya sampai dengan `func NumResult`
                    # jadi tadi kita telah menaikkan state keatas *lifting state up* kemudian memasukkan state menjadi props ke fungsi yang membutuhkan *prop drilling*
                    + terlihat *prop drilling* bukanlah masalah ketika tingkatan komponen sedikit, bagaimana jika banyak? huft.
                    + maka kita akan Mengatasi Prop Drilling
                    + untuk mengatasinya kita perlu mengetahui konsep *Component Composition*
            - Component Composition
                    + adalah sebuah teknik untuk merancang/membuat/menyusun komponen dengan benar
                    + proses memecah bagian-bagian menjadi komponen kecil, lalu menggabungkannya menjadi komponen yang lebih besar.
                    + bertujuan agar komponen-komponen tersebut mudah untuk dikelola dan digunakan kembali
                    + Manfaat:
                        - reusability   : komponen dapat dengan mudah digunakan kembali di berbagai tempat pd aplikasi kita.
                        - modularity    : memecah UI menjadi komponen kecil agar mudah untuk dikelola dan dipahami.
                        - separation of concerns    : setiap komponen dpt fokus pd fungsionalitasnya yg spesifik, agar mudah utk di-test/debug.
                        - code maintainability      : mudah untuk diubah kemudian hari.
                    + Caranya:
                        - buat komponen agar mengerjakan hal spesifik ( tergantung jam terbang ).
                        - gunakan *Container Component*.
            - Container Component
                    + memanfaatkan prop spesial: children.
                    + bisa digunakan untuk memperbaiki *prop drilling*.
                    * ketika aplikasi mau melakukan sesuatu keluar alert berupa `modal box`/overlay yang muncul didepan halaman / popup kecil.
                    + misal kita mau membuat `modal box` untuk konfirmasi hapus akun. didalam popup terdapat icon, title, desc, dan button.
                    + pertama kita buat komponen `func Modal()`
                    + berikutnya kita ingin buat `modal` yang berbeda, tapi karakteristiknya sama dimana modal kali ini untuk notif sukses.
                        juga memiliki icon, title, desc, button dengan isi dan jumlah button berbeda.
                    + `https://www.youtube.com/watch?v=-9Z9a91vTLc&t=541s` *44:46*