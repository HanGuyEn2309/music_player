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
                path: 'https://vnso-zn-15-tf-mp3-s1-m-zmp3.zmdcdn.me/53e5d72faa6b43351a7a/7497565330229145563?authen=exp=1653641676~acl=/53e5d72faa6b43351a7a/*~hmac=f971e4c88f30589b09ae880b0d21eb53&fs=MTY1MzQ2ODg3NjkxMXx3ZWJWNHwxNC4xNzIdUngMTAxLjI',
                image: './assets/img/chuyen_cua_mua_dong.jpg'
            },
            {
                name: 'Cơn mưa tình yêu',
                singer: 'Hà Anh Tuấn',
                path: 'https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/5cfdea8d97c97e9727d8/3568583923011190879?authen=exp=1654316272~acl=/5cfdea8d97c97e9727d8/*~hmac=97f4de61367eec743622413b83bb45e6&fs=MTY1NDE0MzQ3MjkxNnx3ZWJWNHwxNC4xODkdUngMTYyLjmUsIC0',
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
                path: 'https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/becc1deefcaa15f44cbb/7246791638674143393?authen=exp=1654316178~acl=/becc1deefcaa15f44cbb/*~hmac=975c7d130fad24420a65cbdb6c0023c7&fs=MTY1NDE0MzM3ODU4NXx3ZWJWNHwxNC4yNDEdUngMjUzLjmUsICy',
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
                path: 'https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/65245e9fcadb23857aca/5208969760169024776?authen=exp=1654316455~acl=/65245e9fcadb23857aca/*~hmac=cbc191d2dfa6e562f2173afaf53ed314&fs=MTY1NDE0MzY1NTQzMnx3ZWJWNHwxNC4xNzgdUngNy4yNTE',
                image: './assets/img/mai_mai_la_cua_nhau.jpg'
            }
        ],
        us: [
            {
                name: 'My Love',
                singer: 'Westlife',
                path: 'https://vnso-zn-10-tf-mp3-s1-m-zmp3.zmdcdn.me/b3e246bf4cfba5a5fcea/6827923834542022312?authen=exp=1654336470~acl=/b3e246bf4cfba5a5fcea/*~hmac=e6f49820fff1c7b0951563cce94e31b1&fs=MTY1NDE2MzY3MDExN3x3ZWJWNHwxNC4xNjEdUngMS4xMDY',
                image: './assets/img/mylove.jpg',
            },
            {
                name: 'I Lay My Love On You',
                singer: 'Westlife',
                path: 'https://vnso-zn-10-tf-mp3-s1-m-zmp3.zmdcdn.me/6bb166e8c1ac28f271bd/7762447696981566721?authen=exp=1654336570~acl=/6bb166e8c1ac28f271bd/*~hmac=97277dd4dc17af5e1adc341fb21c88ca&fs=MTY1NDE2MzmUsIC3MDg5Mnx3ZWJWNHwxNC4xNjYdUngNTAdUngMTQ0',
                image: './assets/img/i_lay_my_love_on_you.jpg'
            },
            {
                name: 'Nothing\'s Gonna Change My Love For You',
                singer: 'Westlife',
                path: 'https://vnso-zn-5-tf-mp3-s1-m-zmp3.zmdcdn.me/056429f02ab4c3ea9aa5/3845639893463822202?authen=exp=1654326985~acl=/056429f02ab4c3ea9aa5/*~hmac=d7a4cbad9e263d0b057cf7226b0c2da2&fs=MTY1NDE1NDE4NTgxMHx3ZWJWNHwxMDMdUngMTA5LjQzLjU2',
                image: './assets/img/nothing_gonna_change_my_love_for_you.jpg'
            },
            {
                name: 'You Rise Me Up',
                singer: 'Westlife',
                path: 'https://vnso-zn-16-tf-mp3-s1-m-zmp3.zmdcdn.me/b375f4f6fdb214ec4da3/4620694752289169701?authen=exp=1654336774~acl=/b375f4f6fdb214ec4da3/*~hmac=a25aabf091651a32a20e52e03b849a0e&fs=MTY1NDE2Mzk3NDmUsIC4Nnx3ZWJWNHwxNC4xNzUdUngMzIdUngNjA',
                image: './assets/img/you_raise_me_up.jpg'
            },
            {
                name: 'Seasons in the Sun',
                singer: 'Westlife',
                path: 'https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/2645ab980ddfe481bdce/5783920457037640454?authen=exp=1654336828~acl=/2645ab980ddfe481bdce/*~hmac=3e9bc80a6ed6d4154107d896fe69e401&fs=MTY1NDE2NDAyODI3M3x3ZWJWNHwxNC4xODMdUngMTA4LjIwNA',
                image: './assets/img/season_in_the_sun.jpg'
            },
            {
                name: 'What Makes You Beautiful',
                singer: 'One Direction',
                path: 'https://vnso-zn-15-tf-mp3-s1-m-zmp3.zmdcdn.me/f5487c557111984fc100/39153996702653568?authen=exp=1654336885~acl=/f5487c557111984fc100/*~hmac=06077dfb4309886209aa41cacf4fbe07&fs=MTY1NDE2NDA4NTE4NXx3ZWJWNHwxNC4xOTAdUngNzkdUngMw',
                image: './assets/img/what_makes_you_beautiful.jpg'
            },
            {
                name: 'Night Changes',
                singer: 'One Direction',
                path: 'https://vnso-zn-16-tf-mp3-s1-m-zmp3.zmdcdn.me/64dabc2eb46a5d34047b/4025055181571824410?authen=exp=1654336958~acl=/64dabc2eb46a5d34047b/*~hmac=387a5d261c45fdd27a767da130175c39&fs=MTY1NDE2NDE1ODmUsIC5Nnx3ZWJWNHwxNC4xNjkdUngMTQ2LjmUsIC0',
                image: './assets/img/night_changes.jpg'
            },
            {
                name: 'One Thing',
                singer: 'One Direction',
                path: 'https://vnso-zn-5-tf-mp3-s1-m-zmp3.zmdcdn.me/63aef057fe13174d4e02/231849482920141824?authen=exp=1654337026~acl=/63aef057fe13174d4e02/*~hmac=a0c048800cfe70031c826c2722c61644&fs=MTY1NDE2NDIyNjI2M3x3ZWJWNHwxNC4xNjgdUngMTAzLjU1',
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
        audio.ontimeupdate = function () {
            var curtime = this.currentTime
            var min = Math.floor(curtime / 60)
            var sec = Math.floor(curtime % 60)
            curTime.innerText = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
        }
  
        // Song duration time
        audio.onloadedmetadata = function () {
            duration = audio.duration
            var min = Math.floor(duration / 60)
            var sec = Math.floor(duration % 60)
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