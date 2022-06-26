/**
* 1. Render songs
* 2. Scroll top
* 3. Play / pause / seek
* 4. CD rotate
* 5. Next / prev
* 6. Random
* 7. Next / Repeat when ended
* 8. Active song
* 9. Scroll active song into view
* 10. Play song when click
* 11. JSON config
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER';
const MUSIC_STORAGE_LOVE = 'MUSIC_LOVE_SONG';

const player = $('.player');
const playlist = $('.playlist');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const vnBtn = $('.vn-song-btn');
const usBtn = $('.us-song-btn');
const loveBtn = $('.love-song-btn');
const optionBtn = $('.option');
const optionList = $('.option-list');
const addLoveSong = $('.add-love-btn');
const overlay = $('.overlay');
const addText = $('.add-love-text');
const iconLove = $('.icon-love');
const iconDelete = $('.icon-delete');
const curTime = $('#curtime');
const durTime = $('#durtime');

let randomArray = [];
const app = {
    currentIndex: 0,
    currentList: 'vn',
    isPlaying: false,
    isRandom: false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    configLove: JSON.parse(localStorage.getItem(MUSIC_STORAGE_LOVE)) || {},
    songs: {
        vn: [
            {
                name: 'Chuyện của mùa đông',
                singer: 'Hà Anh Tuấn',
                path: './assets/music/Chuyen-Cua-Mua-Dong-Ha-Anh-Tuan.mp3',
                image: './assets/img/chuyen_cua_mua_dong.jpg'
            },
            {
                name: 'Cơn mưa tình yêu',
                singer: 'Hà Anh Tuấn',
                path: './assets/music/Con-Mua-Tinh-Yeu-Ha-Anh-Tuan-Phuong-Linh.mp3',
                image: './assets/img/con_mua_tinh_yeu.jpg'
            },
            {
                name: 'Tháng tư là lời nói dối của em',
                singer: 'Hà Anh Tuấn',
                path: './assets/music/Thang-Tu-La-Loi-Noi-Doi-Cua-Em-Ha-Anh-Tuan.mp3',
                image: './assets/img/thang_tu_la_loi_noi_doi_cua_em.jpg'
            },
            {
                name: 'Tái bút anh yêu em',
                singer: 'Hà Anh Tuấn',
                path: './assets/music/Tai-But-Anh-Yeu-Em-Ha-Anh-Tuan.mp3',
                image: './assets/img/tai_but_a_yeu_e.jpg'
            },
            {
                name: 'Người con gái ta thương',
                singer: 'Hà Anh Tuấn',
                path: './assets/music/Nguoi-Con-Gai-Ta-Thuong-Ha-Anh-Tuan.mp3',
                image: './assets/img/nguoi_con_gai_ta_thuong.jpg'
            },
            {
                name: 'Lặng yên dưới vực sâu',
                singer: 'Bùi Anh Tuấn, Ái Phương',
                path: './assets/music/Lang-Yen-Duoi-Vuc-Sau-OST-Bui-Anh-Tuan-Ai-Phuong.mp3',
                image: './assets/img/lang_yen_duoi_vuc_sau.jpg'
            },
            {
                name: 'Hẹn một mai',
                singer: 'Bùi Anh Tuấn',
                path: './assets/music/Hen-Mot-Mai-4-Nam-2-Chang-1-Tinh-Yeu-OST-Bui-Anh-Tuan.mp3',
                image: './assets/img/hen_mot_mai.jpg'
            },
            {
                name: 'Mãi mãi là của nhau',
                singer: 'Bùi Anh Tuấn',
                path: './assets/music/Mai-Mai-La-Cua-Nhau-4-Nam-2-Chang-1-Tinh-Yeu-OST-Bui-Anh-Tuan.mp3',
                image: './assets/img/mai_mai_la_cua_nhau.jpg'
            }
        ],
        us: [
            {
                name: 'My Love',
                singer: 'Westlife',
                path: './assets/music/My-Love-Westlife.mp3',
                image: './assets/img/mylove.jpg',
            },
            {
                name: 'I Lay My Love On You',
                singer: 'Westlife',
                path: './assets/music/I Lay My Love On You - Westlife.mp3',
                image: './assets/img/i_lay_my_love_on_you.jpg'
            },
            {
                name: 'Nothing\'s Gonna Change My Love For You',
                singer: 'Westlife',
                path: './assets/music/Nothing_s Gonna Change My Love For You.mp3',
                image: './assets/img/nothing_gonna_change_my_love_for_you.jpg'
            },
            {
                name: 'You Rise Me Up',
                singer: 'Westlife',
                path: './assets/music/You Raise Me Up - Westlife.mp3',
                image: './assets/img/you_raise_me_up.jpg'
            },
            {
                name: 'Seasons in the Sun',
                singer: 'Westlife',
                path: './assets/music/Seasons In The Sun - Westlife.mp3',
                image: './assets/img/season_in_the_sun.jpg'
            },
            {
                name: 'What Makes You Beautiful',
                singer: 'One Direction',
                path: './assets/music/What Makes You Beautiful - One Direction.mp3',
                image: './assets/img/what_makes_you_beautiful.jpg'
            },
            {
                name: 'Night Changes',
                singer: 'One Direction',
                path: './assets/music/Night Changes - One Direction.mp3',
                image: './assets/img/night_changes.jpg'
            },
            {
                name: 'One Thing',
                singer: 'One Direction',
                path: './assets/music/One Thing - One Direction.mp3',
                image: './assets/img/one_thing.jpg'
            }
        ],
        love: []
    },
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    setConfigLove: function(arrayLove) {
        this.configLove = arrayLove;
        localStorage.setItem(MUSIC_STORAGE_LOVE, JSON.stringify(this.configLove))
    },
    render: function() {
        const htmls = this.songs[this.currentList].map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentList][this.currentIndex];
            }
        })
    },
    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Handle CD spins / stops
        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Handle CD enlargement / reduction
        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity,
        });
        cdThumbAnimate.pause();

        // Handle when click play
        // Xử lý khi chọn phát nhạc
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // When the song is played
        // Khi bài hát được chạy
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        }

        // When the song is paused
        // Khi bài hát bị ngừng
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        }

        // When the song progress changes
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        // Handle seek
        // Xử lý thay đổi tiến độ bài hát
        // progress.onchange = function(e) {
        //     const seekTime = audio.duration * e.target.value / 100;
        //     audio.currentTime = seekTime;
        // }
        progress.oninput = function(e) {
            const seekTime = audio.duration * e.target.value / 100;
            audio.currentTime = seekTime;
        }

        // When next song
        // Khi chọn chuyển bài hát
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // When prev song
        // Khi chọn lùi bài hát
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // Handling on / off random song
        // Xử lý bật / tắt chế độ phát ngẫu nhiên
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // Handling on / off repeat song
        // Xử lý bật / tắt chế độ phát lại
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // Handle next song when audio ended
        // Xử lý chuyển bài hát khi kết thúc
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.onclick();
            }
        }

        // Song current time
        audio.addEventListener('timeupdate', function () {
            var min = Math.floor(this.currentTime / 60)
            var sec = Math.floor(this.currentTime % 60)
            curTime.innerText = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
        })
  
        // Song duration time
        audio.onloadedmetadata = function () {
            var min = Math.floor(audio.duration / 60)
            var sec = Math.floor(audio.duration % 60)
            durTime.innerText = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
        }

        // Listen to playlist click
        // Lắng nghe hành vi chọn ds nhạc
        playlist.onclick = function(e) {
            const allSongNode = e.target.closest('.song');
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')) {
                // Handle when clicking on the song
                // Xủ lý khi chọn vào 1 bài hát
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index); //convert to number
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                // Handle when clicking on the song option
                // Xủ lý khi chọn tùy chọn
                if(e.target.closest('.option')) {
                    // Delete song
                    if(_this.currentList === 'love') {
                        optionList.classList.add('active');
                        overlay.classList.add('active');

                        addLoveSong.onclick = function() {
                            var indexTrace = Number(allSongNode.dataset.index);
                            _this.songs['love'].splice(indexTrace, 1);
                            _this.render();
                            _this.setConfigLove(_this.songs['love']);

                            alert(`You have deleted song from favorites`);
                            optionList.classList.remove('active');
                            overlay.classList.remove('active');
                        }
                    } 
                    // Add song
                    else {
                        optionList.classList.add('active');
                        overlay.classList.add('active');

                        addLoveSong.onclick = function() {
                            var indexTrace = Number(allSongNode.dataset.index);
                            // console.log(indexTrace);

                            if(_this.currentList === 'vn') {
                                newLove = _this.songs['vn'][indexTrace]
                            } else {
                                newLove = _this.songs['us'][indexTrace]
                            }
                            _this.setConfigLove(newLove);

                            if(!_this.songs['love'].includes(newLove)) {
                                _this.songs['love'].push(newLove);
                                _this.setConfigLove(_this.songs['love']);
                                alert(`You have added song ${newLove.name} in favorites`);
                            } else {
                                alert('This song is already in favorites');
                            }

                            // console.log(_this.songs['love']);
                            optionList.classList.remove('active');
                            overlay.classList.remove('active') ;
                        }
                    }
                }
            }
        }

        // Hanlde when click overlay
        // Xử lý khi ấn overlay
        overlay.onclick = function() {
            overlay.classList.remove('active')
            optionList.classList.remove('active')
        }

        // Handle when click menu playlist
        // Xử lý khi đổi menu danh sách bài hát 
        vnBtn.onclick = function() {
            addText.innerText = 'Add to favorite playlist';
            iconLove.style.display = 'inline-block';
            iconDelete.style.display = 'none';
            vnBtn.classList.add('active');
            usBtn.classList.remove('active');
            loveBtn.classList.remove('active');
            _this.currentList = 'vn';
            _this.currentIndex = 0;
            _this.loadCurrentSong();
            _this.render();
            audio.play();
            playBtn.click();
        }
        usBtn.onclick = function() {
            addText.innerText = 'Add to favorite playlist';
            iconLove.style.display = 'inline-block';
            iconDelete.style.display = 'none';
            usBtn.classList.add('active');
            vnBtn.classList.remove('active');
            loveBtn.classList.remove('active');
            _this.currentList = 'us';
            _this.currentIndex = 0;
            _this.loadCurrentSong();
            _this.render();
            audio.play();
            playBtn.click();
        }
        loveBtn.onclick = function() {
            if(_this.songs['love'].length === 0) {
                alert('You don\'t have a favorite song yet?');
            } else {
                addText.innerText = 'Delete to favorite playlist';
                iconLove.style.display = 'none';
                iconDelete.style.display = 'inline-block';
                loveBtn.classList.add('active');
                usBtn.classList.remove('active');
                vnBtn.classList.remove('active');
                _this.currentList = 'love';
                _this.currentIndex = 0;
                _this.loadCurrentSong();
                _this.render();
                audio.play();
                playBtn.click();
            }
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },
    loadConfig: function() {
        // this.isRandom = this.config.isRandom;
        // this.isRepeat = this.config.isRepeat;
        if(this.config.isRandom) {
            this.isRandom = this.config.isRandom
        } else {
            this.isRandom = false
        }

        if(this.config.isRepeat) {
            this.isRepeat = this.config.isRepeat
        } else {
            this.isRepeat = false
        }

        if(this.config.currentIndex) {
            this.currentIndex = this.config.currentIndex
        } else {
            this.currentIndex = 0
        }

        if(this.configLove.length > 0)  {
            this.songs['love'] = this.songs['love'].concat(this.configLove)
            // console.log(this.songs['love'])
        }
        // console.log(this.configLove.length);
        this.render();
    },
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs[this.currentList].length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs[this.currentList].length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        // let newIndex
        // do {
        //     newIndex = Math.floor(Math.random() * this.songs[this.currentList].length)
        // } while (newIndex === this.currentIndex)
        // this.currentIndex = newIndex;
        // this.loadCurrentSong();
        // console.log(newIndex);

        let newIndex;
        if(randomArray.length === this.songs[this.currentList].length) {
            randomArray = []
        }
        do {
            newIndex = Math.floor(Math.random() * this.songs[this.currentList].length)
        } while (randomArray.includes(newIndex))
        randomArray.push(newIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        console.log(newIndex);
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            })
        }, 300)
    },
    start: function() {
        // Assign configuration from config to application
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();

        // Defines properties for the object
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Listening / handling events (DOM events)
        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // Load the first song information into the UI when running the app
        // Tải thông tin bài hát đầu tiền vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // Display the initial state of the repeat & random button
        // Hiển thị trạng thái ban đầu của button repeat & random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    }
}

app.start();