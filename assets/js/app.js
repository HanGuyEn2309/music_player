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

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Chuyện của mùa đông',
            singer: 'Hà Anh Tuấn',
            path: 'https://vnso-zn-15-tf-mp3-s1-m-zmp3.zmdcdn.me/53e5d72faa6b43351a7a/7497565330229145563?authen=exp=1653641676~acl=/53e5d72faa6b43351a7a/*~hmac=f971e4c88f30589b09ae880b0d21eb53&fs=MTY1MzQ2ODg3NjkxMXx3ZWJWNHwxNC4xNzIdUngMTAxLjI',
            image: './assets/img/chuyen_cua_mua_dong.jpg'
        },
        {
            name: 'Cơn mưa tình yêu',
            singer: 'Hà Anh Tuấn',
            path: 'https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/5cfdea8d97c97e9727d8/3568583923011190879?authen=exp=1653641552~acl=/5cfdea8d97c97e9727d8/*~hmac=b05f9138a6d36e30cf73781263af7dee&fs=MTY1MzQ2ODmUsIC1MjYxM3x3ZWJWNHwxMTmUsICdUngNS4xNTMdUngMTM2',
            image: './assets/img/con_mua_tinh_yeu.jpg'
        },
        {
            name: 'Tháng tư là lời nói dối của em',
            singer: 'Hà Anh Tuấn',
            path: 'https://vnso-zn-16-tf-mp3-s1-m-zmp3.zmdcdn.me/9dde8dee57aabef4e7bb/7587729695603023061?authen=exp=1653630064~acl=/9dde8dee57aabef4e7bb/*~hmac=40ba229552444e28961ce575b77bbfff&fs=MTY1MzQ1NzI2NDMzNnx3ZWJWNHw0Mi4xMTIdUngOTQdUngMTg1',
            image: './assets/img/thang_tu_la_loi_noi_doi_cua_em.jpg'
        },
        {
            name: 'Tái bút anh yêu em',
            singer: 'Hà Anh Tuấn',
            path: 'https://vnso-zn-15-tf-mp3-s1-m-zmp3.zmdcdn.me/e7fdf5cd2f89c6d79f98/451942829190736760?authen=exp=1653641897~acl=/e7fdf5cd2f89c6d79f98/*~hmac=b9b821169d5c0787b1c4f701110108c5&fs=MTY1MzQ2OTA5NzmUsIC3Mnx3ZWJWNHwxNC4xNjEdUngMTQ5Ljky',
            image: './assets/img/tai_but_a_yeu_e.jpg'
        },
        {
            name: 'Người con gái ta thương',
            singer: 'Hà Anh Tuấn',
            path: 'https://vnso-zn-15-tf-mp3-s1-m-zmp3.zmdcdn.me/e0b1f6812cc5c59b9cd4/7534223447334609740?authen=exp=1653642375~acl=/e0b1f6812cc5c59b9cd4/*~hmac=ae0b8168780e0e14958f548833bd28cd&fs=MTY1MzQ2OTU3NTEwOHx3ZWJWNHwxNC4xNzMdUngMTYyLjE1MA',
            image: './assets/img/nguoi_con_gai_ta_thuong.jpg'
        },
        {
            name: 'Lặng yên dưới vực sâu',
            singer: 'Bùi Anh Tuấn, Ái Phương',
            path: 'https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/becc1deefcaa15f44cbb/7246791638674143393?authen=exp=1653642462~acl=/becc1deefcaa15f44cbb/*~hmac=d3652fc16854431bebeccd5e28b9be14&fs=MTY1MzQ2OTY2MjkyOHx3ZWJWNHwxNC4xNzUdUngMTIwLjE2Mg',
            image: './assets/img/lang_yen_duoi_vuc_sau.jpg'
        },
        {
            name: 'Hẹn một mai',
            singer: 'Bùi Anh Tuấn',
            path: 'https://vnso-zn-10-tf-mp3-s1-m-zmp3.zmdcdn.me/77bc7407e043091d5052/5307620850835463226?authen=exp=1653642504~acl=/77bc7407e043091d5052/*~hmac=46d178ff3961af52bd2eb5e8b444cb05&fs=MTY1MzQ2OTmUsICwNDAwOXx3ZWJWNHwxNC4xODMdUngMTMxLjE2NA',
            image: './assets/img/hen_mot_mai.jpg'
        },
        {
            name: 'Mãi mãi là của nhau',
            singer: 'Bùi Anh Tuấn',
            path: 'https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/65245e9fcadb23857aca/5208969760169024776?authen=exp=1653642574~acl=/65245e9fcadb23857aca/*~hmac=e2f8d0a65e373450060cc0f7af2de965&fs=MTY1MzQ2OTmUsIC3NDU0N3x3ZWJWNHwxNC4xNjgdUngMjA3Ljky',
            image: './assets/img/mai_mai_la_cua_nhau.jpg'
        }
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
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
                return this.songs[this.currentIndex];
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
        progress.onchange = function(e) {
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

        // Listen to playlist click
        // Lắng nghe hành vi chọn ds nhạc
        playlist.onclick = function(e) {
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
                    
                }
            }
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
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