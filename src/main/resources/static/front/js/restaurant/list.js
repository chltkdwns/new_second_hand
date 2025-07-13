window.addEventListener("DOMContentLoaded", function () {
    const { mapLib } = commonLib;
    const el = document.getElementById("map");
    const applyBtn = document.getElementById("applyFilterBtn");
    const categorySelect = document.getElementById("categorySelect");

    // 기본 지도 로딩 (현재 위치 기준)
    navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        fetch(`/restaurant/search?lat=${lat}&lon=${lon}&cnt=50`)
            .then(res => res.json())
            .then(items => {
                mapLib.load(el, items, null, '100%', '500px');
            });
    });

    // 확인 버튼 클릭 시 카테고리 필터 요청
    applyBtn.addEventListener("click", function () {
        const selectedOptions = Array.from(categorySelect.selectedOptions).map(opt => opt.value);
        if (selectedOptions.length === 0) return;

        // 선택된 카테고리 중 하나 무작위 선택
        const category = selectedOptions[Math.floor(Math.random() * selectedOptions.length)];

        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude: lat, longitude: lon } = pos.coords;
            fetch(`/restaurant/search?lat=${lat}&lon=${lon}&cnt=50`)
                .then(res => res.json())
                .then(items => {
                    const filtered = items.filter(item => item.category === category);
                    if (filtered.length > 0) {
                        const random = filtered[Math.floor(Math.random() * filtered.length)];

                        // 지도 다시 로드
                        mapLib.load(el, [random], null, '100%', '500px');

                        // 추천 박스 표시
                        document.getElementById("recommendationName").textContent = `이름: ${random.name}`;
                        document.getElementById("recommendationAddress").textContent = `주소: ${random.roadAddress}`;
                    } else {
                        alert("해당 카테고리의 식당이 근처에 없습니다.");
                    }
                });
        });
    });
});
