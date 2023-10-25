var vm = new Vue({
    el: '#songacha',
    data: {
        jsb1: undefined,
        gachaResult: undefined,
        selectedReg: '-',
        selectedDif: '-',
        filteredSong: undefined,
        filteredSongNum: undefined,
        show: true,
        randomKeyToggle: false,
        // 定番度
        reg: [
            {value: '-', text: 'ランダム'},
            {value: '1', text: 'やらない'},
            {value: '2', text: '稀にやる'},
            {value: '3', text: 'たまにね'},
            {value: '4', text: 'よくやる'},
            {value: '5', text: '定番曲！'},
        ],
        // 難易度
        dif: [
            {value: '-', text: 'ランダム'},
            {value: '1', text: '簡単？！'},
            {value: '2', text: 'まあ簡単'},
            {value: '3', text: '　普通　'},
            {value: '4', text: 'ちょい難'},
            {value: '5', text: '難しい！'},
        ],
        // キー
        key: [
            'C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'
        ]
    },

    mounted: function() {
        fetch('./data/jsb1.json')
            .then(response => response.json())
            .then(jsb1 => {
                this.jsb1 = jsb1;
                this.filteredSongNum = jsb1.length;
                this.filteredSong = jsb1;
            });
    },

    methods: {
        // ランダム選曲 (未使用)
        rollGacha: function() {
            // 曲数を取得
            this.gachaResult=undefined;
            let songNum = this.jsb1.length;
            // ランダムで曲番号 (0 ~ songNum-1) を取得
            let songIndex = Math.floor(Math.random() * songNum);
            // 結果を保持 (song,page,regularity,difficulty)
            let choosedSong = this.jsb1[songIndex];
            this.gachaResult = choosedSong;
            console.log(this.gachaResult);
        },
        // オプションを考慮したランダム選曲
        rollFilteredGacha: function() {
            // 曲数を取得
            this.gachaResult=undefined;
            let songNum = this.filteredSong.length;
            // ランダムで曲番号 (0 ~ songNum-1) を取得
            let songIndex = Math.floor(Math.random() * songNum);
            // 結果を保持 (song,page,regularity,difficulty)
            let choosedSong = this.filteredSong[songIndex];
            this.gachaResult = choosedSong;
            // ランダムキーの設定
            if(this.randomKeyToggle) {
                let keyNum = this.key.length;
                let keyIndex = Math.floor(Math.random() * keyNum);
                this.gachaResult.key=this.key[keyIndex];
            }else{
                this.gachaResult.key='-';
            }
            console.log(this.gachaResult);
        },
        // 選曲オプション：定番度
        selectRegularity: function() {
            this.filteredSong = [];
            for(let i=0; i<this.jsb1.length; i++) {
                let song = this.jsb1[i];
                // 定番度と難易度が両方とも選択されている場合
                if(this.selectedReg != '-' && this.selectedDif != '-') {
                    if(song.regularity == this.selectedReg && song.difficulty == this.selectedDif) {
                        this.filteredSong.push(song);
                    }
                }
                // 定番度のみ選択されている場合
                else if(this.selectedReg != '-') {
                    if(song.regularity == this.selectedReg) {
                        this.filteredSong.push(song);
                    }
                }
                // 難易度のみ選択されている場合
                else if(this.selectedDif != '-') {
                    if(song.difficulty == this.selectedDif) {
                        this.filteredSong.push(song);
                    }
                }
                // どちらも選択されていない場合
                else {
                    this.filteredSong.push(song);
                }
            }
            this.filteredSongNum = this.filteredSong.length;
            console.log(this.filteredSongNum);
            
        },
        // 選曲オプション：難易度
        selectDifficulty: function() {
            this.filteredSong = [];
            for(let i=0; i<this.jsb1.length; i++) {
                let song = this.jsb1[i];
                // 定番度と難易度が両方とも選択されている場合
                if(this.selectedReg != '-' && this.selectedDif != '-') {
                    if(song.regularity == this.selectedReg && song.difficulty == this.selectedDif) {
                        this.filteredSong.push(song);
                    }
                }
                // 定番度のみ選択されている場合
                else if(this.selectedReg != '-') {
                    if(song.regularity == this.selectedReg) {
                        this.filteredSong.push(song);
                    }
                }
                // 難易度のみ選択されている場合
                else if(this.selectedDif != '-') {
                    if(song.difficulty == this.selectedDif) {
                        this.filteredSong.push(song);
                    }
                }
                // どちらも選択されていない場合
                else {
                    this.filteredSong.push(song);
                }
            }
            this.filteredSongNum = this.filteredSong.length;
            console.log(this.filteredSongNum);
        },
        // 選曲オプション：キーランダム
        toggleRandomKey: function() {
            this.randomKeyToggle = !this.randomKeyToggle;
            console.log(this.randomKeyToggle)
        },
    },
});