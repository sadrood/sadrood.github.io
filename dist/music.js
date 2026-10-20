// APlayer 配置 - 修复版
// 原始音频链接来自 ytmp3.cn 已失效，需替换为可用的音频源
// 建议：使用 MetingJS + 网易云音乐 API，或自托管音频文件

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('aplayer');
    if (!container) return;

    // 检查 APlayer 是否已加载
    if (typeof APlayer === 'undefined') {
        console.warn('APlayer 未加载，跳过音乐播放器初始化');
        return;
    }

    // 音频列表 - 请替换为有效的音频链接
    // 格式示例：
    // {
    //     name: "歌曲名",
    //     artist: "歌手",
    //     url: "https://example.com/audio.mp3",  // 必须是可直接播放的 MP3 链接
    //     cover: "https://example.com/cover.jpg"
    // }
    const audioList = [
        // 示例：网易云音乐外链（需自行获取有效链接）
        // {
        //     name: "平凡之路",
        //     artist: "朴树",
        //     url: "https://music.163.com/song/media/outer/url?id=188852.mp3",
        //     cover: "https://p1.music.126.net/xxx.jpg"
        // },
    ];

    if (audioList.length === 0) {
        // 无可用音频源时，隐藏播放器容器
        container.style.display = 'none';
        console.log('暂无可用音频源，音乐播放器已隐藏');
        return;
    }

    try {
        const ap = new APlayer({
            container: container,
            fixed: true,
            autoplay: false,
            audio: audioList
        });

        // 错误处理
        ap.on('error', function(err) {
            console.warn('APlayer 播放错误:', err);
            // 可选：自动跳过错误音频
            ap.skipForward();
        });

        // 全局暴露，方便调试
        window.aplayer = ap;
    } catch (e) {
        console.error('APlayer 初始化失败:', e);
        container.style.display = 'none';
    }
});