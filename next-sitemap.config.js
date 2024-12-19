module.exports = {
    siteUrl: 'https://www.ontaplade.com', // Thay bằng URL của bạn
    generateRobotsTxt: true,               // Tạo file robots.txt
    changefreq: 'daily',                   // Tần suất cập nhật trang
    priority: 0.7,                         // Độ ưu tiên của trang
    sitemapSize: 5000,                     // Số lượng URL tối đa trong mỗi sitemap
    robotsTxtOptions: {
        policies: [
          { userAgent: '*', allow: '/' },    // Cho phép mọi trang
          { userAgent: 'Googlebot', allow: '/' },
          { userAgent: '*', disallow: ['/admin', '/private'] }, // Chặn các trang cụ thể
        ],
        additionalSitemaps: [
          'https://www.ontaplade.com/sitemap.xml', // Nếu bạn có nhiều sitemap
          'https://www.ontaplade.com/sitemap-0.xml',
        ],
      },
  };
  