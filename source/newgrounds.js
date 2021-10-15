const Newgrounds = {

    Init(app_id, cipher=0, debug=0) {
        this.app_id = app_id;
        this.cipher = cipher;
        this.medalDisplayTime = 5;
        this.showPopups = 1;
        this.showDescriptions = 1;
        this.points = [5, 10, 25, 50, 100];
        this.displayMedalQueue = [];
        this.debug = debug;
            
        const url = new URL(window.location.href);
        this.session_id = url.searchParams.get('ngio_session_id') ?? 0;
    
        const scoreboardResult = this.Call('ScoreBoard.getBoards', 0, 0);
        this.scoreboards = scoreboardResult?.result?.data?.scoreboards ?? [];
        
        const resultMedals = this.Call('Medal.getList', 0, 0);
        this.medals = resultMedals?.result?.data?.medals ?? [];

        for (const medal of this.medals) {
            medal.image = new Image();
            medal.image.src = medal.icon;

            if (this.debug) medal.unlocked = 0;
        }
    },

    Update(delta)
    {
        if (this.displayMedalQueue?.length) {
            const medal = this.displayMedalQueue[0];
            medal.time += delta;

            if (medal.time > this.medalDisplayTime) this.displayMedalQueue.shift();
        };
    },

    Render(context, size = 50)
    { 
        if (this.displayMedalQueue?.length) {
            const medal = this.displayMedalQueue[0];
            const slideOnPecent = medal.time < 1 ? 1-medal.time : 0;
            const alpha = medal.time > this.medalDisplayTime - 1 ? this.medalDisplayTime - medal.time : 1;

            const y = context.canvas.height + slideOnPecent * size * 1.5;
            this.RenderMedal(context, medal.index, 0, y - size, size, alpha);
        };
    },

    RenderMedal(context, id, x, y, h, alpha=.5)
    {
        if (!this.medals || !this.medals.find(m => m.id == id)) return;
            
        context.save();
        context.fillStyle = '#fff';
        context.strokeStyle = '#000';
        context.shadowColor = '#000';
        context.textBaseline = 'middle';
        context.textAlign = 'left';
        context.font = (h/2)+'px impact';
        context.lineWidth = h/35;
        context.shadowBlur = h/5;
        context.globalAlpha = alpha;
        
        const medal = this.medals.find(m => m.id == id);
        
        context.drawImage(medal.image, x, y, h, h);
        context.strokeRect(x, y, h, h);

        const points = this.points[medal.difficulty - 1];
        const text = this.GetMedalDisplayText(medal);
        context.lineWidth = Math.max(1,h/26);
        context.strokeText(text, x + h*1.2, y+h/2);
        context.fillText(text, x + h*1.2, y+h/2);
        context.restore();
    },

    UnlockMedal(id) {
        if(!this.medals || !this.medals.find(m => m.id == id)) return;
        
        const medal = this.medals.find(m => m.id == id);
            
        if(medal.unlocked) return;  
        medal.unlocked = true;

        this.Call('Medal.unlock', {id:medal.id});
    },

    PostScore(id, value) {
        if(!this.scoreboards || !this.scoreboards.find(b => b.id == id)) return;
            
        const board = this.scoreboards.find(b => b.id == id);

        this.Call('ScoreBoard.postScore', {id:board.id, value});
    },

    GetScores(id, user=0, period="A", social=0, skip=0, limit=10) {
        if(!this.scoreboards || !this.scoreboards.find(b => b.id == id)) return;
            
        const board = this.scoreboards.find(b => b.id == id);
        const scores = this.Call('ScoreBoard.getScores',  {id:board.id, user, period, social, skip, limit}, 0);

        return scores.result?.data?.scores;
    },

    Username() {
        const session = this.Call('App.checkSession');

        return session?.result?.data?.session?.user?.name;
    },

    Version() {
        const version = this.Call('App.getCurrentVersion');

        return version?.result?.data?.current_version;
    },

    IsSupporter() {
        const session = this.Call('App.checkSession');

        return session?.result?.data?.session?.user?.supporter;
    },
    
    Call(component, parameters=0, async=1) {
        const call = this.EncryptCall({component, parameters});
        
        const input =  {
            app_id: this.app_id,
            session_id: this.session_id,
            call
        };

        const formData = new FormData();
        formData.append('input', JSON.stringify(input));
        
        const xmlHttp = new XMLHttpRequest();
        const url = 'https://newgrounds.io/gateway_v3.php';

        xmlHttp.open('POST', url, this.debug? 0 : async);
        xmlHttp.send(formData);
        
        if (xmlHttp.responseText) {
            if (this.debug) console.log(xmlHttp.responseText);

            this.responseText = xmlHttp.responseText;
            return JSON.parse(xmlHttp.responseText);
        };
    },
    
    EncryptCall(call) {
        if (!this.cipher) return call;
        
        const aesKey = this.CryptoJS.enc.Base64.parse(this.cipher);
        const iv = this.CryptoJS.lib.WordArray.random(16);
        const encrypted = this.CryptoJS.AES.encrypt(JSON.stringify(call), aesKey, {iv});
        const secure = this.CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));

        call.secure = secure;
        call.parameters = null;
        return call;
    },

};

!function(t,e){"object"==typeof exports?module.exports=exports=e():"function"==typeof define&&define.amd?define([],e):Newgrounds.CryptoJS=e()}(0,function(){var t=t||function(t,e){var r;if("undefined"!=typeof window&&window.crypto&&(r=window.crypto),!r&&"undefined"!=typeof window&&window.msCrypto&&(r=window.msCrypto),!r&&"undefined"!=typeof global&&global.crypto&&(r=global.crypto),!r&&"function"==typeof require)try{r=require("crypto")}catch(t){}var i=function(){if(r){if("function"==typeof r.getRandomValues)try{return r.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof r.randomBytes)try{return r.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},n=Object.create||function(){function t(){}return function(e){var r;return t.prototype=e,r=new t,t.prototype=null,r}}(),o={},c=o.lib={},s=c.Base={extend:function(t){var e=n(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},a=c.WordArray=s.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||Hex).stringify(this)},concat:function(t){var e=this.words,r=t.words,i=this.sigBytes,n=t.sigBytes;if(this.clamp(),i%4)for(var o=0;o<n;o++){var c=r[o>>>2]>>>24-o%4*8&255;e[i+o>>>2]|=c<<24-(i+o)%4*8}else for(o=0;o<n;o+=4)e[i+o>>>2]=r[o>>>2];return this.sigBytes+=n,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=s.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],r=0;r<t;r+=4)e.push(i());return new a.init(e,t)}}),f=o.enc={},u=f.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n++){var o=e[n>>>2]>>>24-n%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new a.init(r,e)}},h=f.Utf8={stringify:function(t){try{return decodeURIComponent(escape(u.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return u.parse(unescape(encodeURIComponent(t)))}};c.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=h.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r,i=this._data,n=i.words,o=i.sigBytes,c=this.blockSize,s=o/(4*c),f=(s=e?t.ceil(s):t.max((0|s)-this._minBufferSize,0))*c,u=t.min(4*f,o);if(f){for(var h=0;h<f;h+=c)this._doProcessBlock(n,h);r=n.splice(0,f),i.sigBytes-=u}return new a.init(r,u)},clone:function(){var t=s.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),o.algo={};return o}(Math);return function(){var e=t,r=e.lib.WordArray;e.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,i=this._map;t.clamp();for(var n=[],o=0;o<r;o+=3)for(var c=(e[o>>>2]>>>24-o%4*8&255)<<16|(e[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|e[o+2>>>2]>>>24-(o+2)%4*8&255,s=0;s<4&&o+.75*s<r;s++)n.push(i.charAt(c>>>6*(3-s)&63));var a=i.charAt(64);if(a)for(;n.length%4;)n.push(a);return n.join("")},parse:function(t){var e=t.length,i=this._map,n=this._reverseMap;if(!n){n=this._reverseMap=[];for(var o=0;o<i.length;o++)n[i.charCodeAt(o)]=o}var c=i.charAt(64);if(c){var s=t.indexOf(c);-1!==s&&(e=s)}return function(t,e,i){for(var n=[],o=0,c=0;c<e;c++)if(c%4){var s=i[t.charCodeAt(c-1)]<<c%4*2,a=i[t.charCodeAt(c)]>>>6-c%4*2,f=s|a;n[o>>>2]|=f<<24-o%4*8,o++}return r.create(n,o)}(t,e,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),t.lib.Cipher||function(e){var r=t,i=r.lib,n=i.Base,o=i.WordArray,c=i.BufferedBlockAlgorithm,s=r.enc,a=(s.Utf8,s.Base64),f=r.algo.EvpKDF,u=i.Cipher=c.extend({cfg:n.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){c.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function t(t){return"string"==typeof t?m:v}return function(e){return{encrypt:function(r,i,n){return t(i).encrypt(e,r,i,n)},decrypt:function(r,i,n){return t(i).decrypt(e,r,i,n)}}}}()}),h=(i.StreamCipher=u.extend({_doFinalize:function(){return this._process(!0)},blockSize:1}),r.mode={}),d=i.BlockCipherMode=n.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),p=h.CBC=function(){var t=d.extend();function r(t,r,i){var n,o=this._iv;o?(n=o,this._iv=e):n=this._prevBlock;for(var c=0;c<i;c++)t[r+c]^=n[c]}return t.Encryptor=t.extend({processBlock:function(t,e){var i=this._cipher,n=i.blockSize;r.call(this,t,e,n),i.encryptBlock(t,e),this._prevBlock=t.slice(e,e+n)}}),t.Decryptor=t.extend({processBlock:function(t,e){var i=this._cipher,n=i.blockSize,o=t.slice(e,e+n);i.decryptBlock(t,e),r.call(this,t,e,n),this._prevBlock=o}}),t}(),l=(r.pad={}).Pkcs7={pad:function(t,e){for(var r=4*e,i=r-t.sigBytes%r,n=i<<24|i<<16|i<<8|i,c=[],s=0;s<i;s+=4)c.push(n);var a=o.create(c,i);t.concat(a)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},y=(i.BlockCipher=u.extend({cfg:u.cfg.extend({mode:p,padding:l}),reset:function(){var t;u.reset.call(this);var e=this.cfg,r=e.iv,i=e.mode;this._xformMode==this._ENC_XFORM_MODE?t=i.createEncryptor:(t=i.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,r&&r.words):(this._mode=t.call(i,this,r&&r.words),this._mode.__creator=t)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t,e=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(e.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),e.unpad(t)),t},blockSize:4}),i.CipherParams=n.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),_=(r.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext,r=t.salt;return(r?o.create([1398893684,1701076831]).concat(r).concat(e):e).toString(a)},parse:function(t){var e,r=a.parse(t),i=r.words;return 1398893684==i[0]&&1701076831==i[1]&&(e=o.create(i.slice(2,4)),i.splice(0,4),r.sigBytes-=16),y.create({ciphertext:r,salt:e})}},v=i.SerializableCipher=n.extend({cfg:n.extend({format:_}),encrypt:function(t,e,r,i){i=this.cfg.extend(i);var n=t.createEncryptor(r,i),o=n.finalize(e),c=n.cfg;return y.create({ciphertext:o,key:r,iv:c.iv,algorithm:t,mode:c.mode,padding:c.padding,blockSize:t.blockSize,formatter:i.format})},decrypt:function(t,e,r,i){return i=this.cfg.extend(i),e=this._parse(e,i.format),t.createDecryptor(r,i).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),g=(r.kdf={}).OpenSSL={execute:function(t,e,r,i){i||(i=o.random(8));var n=f.create({keySize:e+r}).compute(t,i),c=o.create(n.words.slice(e),4*r);return n.sigBytes=4*e,y.create({key:n,iv:c,salt:i})}},m=i.PasswordBasedCipher=v.extend({cfg:v.cfg.extend({kdf:g}),encrypt:function(t,e,r,i){var n=(i=this.cfg.extend(i)).kdf.execute(r,t.keySize,t.ivSize);i.iv=n.iv;var o=v.encrypt.call(this,t,e,n.key,i);return o.mixIn(n),o},decrypt:function(t,e,r,i){i=this.cfg.extend(i),e=this._parse(e,i.format);var n=i.kdf.execute(r,t.keySize,t.ivSize,e.salt);return i.iv=n.iv,v.decrypt.call(this,t,e,n.key,i)}})}(),function(){var e=t,r=e.lib.BlockCipher,i=e.algo,n=[],o=[],c=[],s=[],a=[],f=[],u=[],h=[],d=[],p=[];!function(){for(var t=[],e=0;e<256;e++)t[e]=e<128?e<<1:e<<1^283;var r=0,i=0;for(e=0;e<256;e++){var l=i^i<<1^i<<2^i<<3^i<<4;l=l>>>8^255&l^99,n[r]=l,o[l]=r;var y=t[r],_=t[y],v=t[_],g=257*t[l]^16843008*l;c[r]=g<<24|g>>>8,s[r]=g<<16|g>>>16,a[r]=g<<8|g>>>24,f[r]=g;g=16843009*v^65537*_^257*y^16843008*r;u[l]=g<<24|g>>>8,h[l]=g<<16|g>>>16,d[l]=g<<8|g>>>24,p[l]=g,r?(r=y^t[t[t[v^y]]],i^=t[t[i]]):r=i=1}}();var l=[0,1,2,4,8,16,32,64,128,27,54],y=i.AES=r.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var t=this._keyPriorReset=this._key,e=t.words,r=t.sigBytes/4,i=4*((this._nRounds=r+6)+1),o=this._keySchedule=[],c=0;c<i;c++)c<r?o[c]=e[c]:(f=o[c-1],c%r?r>6&&c%r==4&&(f=n[f>>>24]<<24|n[f>>>16&255]<<16|n[f>>>8&255]<<8|n[255&f]):(f=n[(f=f<<8|f>>>24)>>>24]<<24|n[f>>>16&255]<<16|n[f>>>8&255]<<8|n[255&f],f^=l[c/r|0]<<24),o[c]=o[c-r]^f);for(var s=this._invKeySchedule=[],a=0;a<i;a++){c=i-a;if(a%4)var f=o[c];else f=o[c-4];s[a]=a<4||c<=4?f:u[n[f>>>24]]^h[n[f>>>16&255]]^d[n[f>>>8&255]]^p[n[255&f]]}}},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,c,s,a,f,n)},decryptBlock:function(t,e){var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,u,h,d,p,o);r=t[e+1];t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,i,n,o,c,s){for(var a=this._nRounds,f=t[e]^r[0],u=t[e+1]^r[1],h=t[e+2]^r[2],d=t[e+3]^r[3],p=4,l=1;l<a;l++){var y=i[f>>>24]^n[u>>>16&255]^o[h>>>8&255]^c[255&d]^r[p++],_=i[u>>>24]^n[h>>>16&255]^o[d>>>8&255]^c[255&f]^r[p++],v=i[h>>>24]^n[d>>>16&255]^o[f>>>8&255]^c[255&u]^r[p++],g=i[d>>>24]^n[f>>>16&255]^o[u>>>8&255]^c[255&h]^r[p++];f=y,u=_,h=v,d=g}y=(s[f>>>24]<<24|s[u>>>16&255]<<16|s[h>>>8&255]<<8|s[255&d])^r[p++],_=(s[u>>>24]<<24|s[h>>>16&255]<<16|s[d>>>8&255]<<8|s[255&f])^r[p++],v=(s[h>>>24]<<24|s[d>>>16&255]<<16|s[f>>>8&255]<<8|s[255&u])^r[p++],g=(s[d>>>24]<<24|s[f>>>16&255]<<16|s[u>>>8&255]<<8|s[255&h])^r[p++];t[e]=y,t[e+1]=_,t[e+2]=v,t[e+3]=g},keySize:8});e.AES=r._createHelper(y)}(),t});

module.exports = Newgrounds;