const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// داده‌های نمونه (چند شغل)
const mockOccupations = {
    "11-2022.00": {
        title: "مدیر منابع انسانی",
        duties: [
            "برنامه‌ریزی و اجرای سیاست‌های منابع انسانی",
            "مدیریت فرآیند جذب و استخدام",
            "طراحی سیستم‌های ارزیابی عملکرد",
            "هماهنگی آموزش کارکنان",
            "مدیریت روابط کار و حل اختلافات"
        ]
    },
    "15-1132.00": {
        title: "توسعه‌دهنده نرم‌افزار",
        duties: [
            "تحلیل نیازمندی‌ها و طراحی نرم‌افزار",
            "کدنویسی و توسعه برنامه‌ها",
            "تست و رفع اشکال",
            "مستندسازی کدها",
            "همکاری با تیم محصول"
        ]
    },
    "13-1151.00": {
        title: "کارشناس آموزش",
        duties: [
            "شناسایی نیازهای آموزشی",
            "طراحی و اجرای دوره‌ها",
            "ارزیابی اثربخشی آموزش",
            "هماهنگی با مربیان",
            "مدیریت بودجه آموزش"
        ]
    }
};

// جستجو بر اساس عنوان
app.get('/api/search', (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) return res.status(400).json({ error: 'کلمه کلیدی وارد کنید' });
    const results = Object.entries(mockOccupations)
        .filter(([code, job]) => job.title.includes(keyword))
        .map(([code, job]) => ({ code, title: job.title }));
    res.json(results);
});

// دریافت اطلاعات کامل شغل با کد
app.get('/api/onet/:code', (req, res) => {
    const code = req.params.code;
    const job = mockOccupations[code];
    if (!job) return res.status(404).json({ error: 'کد یافت نشد' });
    res.json(job);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));