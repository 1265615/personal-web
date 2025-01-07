document.addEventListener('DOMContentLoaded', () => {
    const countdownOverlay = document.getElementById('countdownOverlay');
    const countdown = document.getElementById('countdown');
    const mainContent = document.getElementById('mainContent');
    const confirmBtn = document.getElementById('confirmBtn');
    let count = 3;

    // 音频控制
    const bgMusic = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeControl = document.getElementById('volume');

    // 音频错误处理
    bgMusic.addEventListener('error', (e) => {
        console.error('音频加载错误:', e);
        const audioError = document.querySelector('.audio-error');
        if (audioError) {
            audioError.style.display = 'block';
        }
    });

    // 音频加载成功
    bgMusic.addEventListener('loadeddata', () => {
        console.log('音频加载成功');
        const audioError = document.querySelector('.audio-error');
        if (audioError) {
            audioError.style.display = 'none';
        }
    });

    // 播放/暂停按钮控制
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(e => console.error('播放失败:', e));
            } else {
                bgMusic.pause();
            }
        });
    }

    // 音量控制
    if (volumeControl) {
        volumeControl.addEventListener('input', (e) => {
            bgMusic.volume = e.target.value;
        });
    }

    // 倒计时函数
    const startCountdown = () => {
        countdown.textContent = count;

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                countdown.textContent = count;
            } else if (count === 0) {
                countdown.textContent = "准备好了吗？";
                clearInterval(timer);
                confirmBtn.style.display = 'inline-block';
            }
        }, 1000);
    };

    // 确认按钮点击事件
    confirmBtn.addEventListener('click', () => {
        countdownOverlay.style.opacity = '0';
        setTimeout(() => {
            countdownOverlay.style.display = 'none';
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.classList.add('visible');
                startDecorations();
            }, 100);
        }, 1000);
    });

    // 装饰元素动画
    const startDecorations = () => {
        setInterval(() => {
            const bats = document.querySelectorAll('.bat');
            bats.forEach(bat => {
                const randomTop = Math.random() * 50;
                bat.style.top = `${randomTop}%`;
            });
        }, 10000);

        const pumpkin = document.querySelector('.pumpkin');
        if (pumpkin) {
            setInterval(() => {
                const randomOpacity = 0.2 + Math.random() * 0.4;
                pumpkin.style.opacity = randomOpacity;
            }, 2000);
        }
    };

    // 开始倒计时
    startCountdown();
}); 