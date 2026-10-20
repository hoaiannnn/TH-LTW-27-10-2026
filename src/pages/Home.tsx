function Home() {
  return (
    <main className="main">
      <div className="container">
        <div className="hero">
          <h1 className="hero_heading">
            Công cụ miễn phí giúp Học tập đơn giản
          </h1>

          <p className="hero_desc">
            PDF, ảnh, video, văn bản và tệp dữ liệu. Mở trình duyệt là dùng
            được, không cần cài đặt.
          </p>

          <div className="hero__search">
            <input
              type="text"
              className="hero_search--item"
              placeholder="Tìm kiếm công cụ..."
            />

            <button className="hero__search--btn btn">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;