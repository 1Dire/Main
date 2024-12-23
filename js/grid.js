// 커스텀 렌더러: 링크 버튼
class LinkButtonRenderer {
  constructor(props) {
    const container = document.createElement("div");
    container.className = "button-container";

    // 버튼 생성
    const el = document.createElement("button");
    el.textContent = "Go";
    el.style.padding = "2px 5px";
    el.style.fontSize = "12px";
    el.style.height = "25px";
    el.style.width = "50px";
    el.style.backgroundColor = "#c27f4a"; // 카페 색상 (카멜 색상)
    el.style.color = "#fff";
    el.style.border = "none";
    el.style.borderRadius = "4px";
    el.style.cursor = "pointer";
    el.style.transition = "all 0.3s ease";

    // 링크가 없거나 "" 일 때 비활성화 처리
    if (!props.value || props.value === "") {
      el.disabled = true;
      el.style.backgroundColor = "#d1b28f"; // 비활성화된 버튼 색상 (연한 카멜)
      el.style.cursor = "not-allowed"; // 비활성화된 커서
      el.style.transition = "none"; // 비활성화된 상태에서는 hover 효과가 없도록
    } else {
      // 링크가 있을 경우 클릭 이벤트 추가
      el.addEventListener("click", () => {
        const link = props.value;
        window.open(link, "_blank");
      });

      // 링크가 있을 경우 hover 효과와 transform 추가
      el.addEventListener("mouseenter", () => {
        el.style.backgroundColor = "#b97f4e"; // 어두운 갈색
        el.style.boxShadow = "0 4px 8px rgba(139, 94, 60, 0.3)";
        el.style.transform = "scale(1.1)"; // 크기 확대
      });

      el.addEventListener("mouseleave", () => {
        el.style.backgroundColor = "#c27f4a"; // 원래 색상
        el.style.boxShadow = "none";
        el.style.transform = "scale(1)"; // 원래 크기
      });
    }

    container.appendChild(el);
    this.el = container;
  }

  getElement() {
    return this.el;
  }

  render(props) {}
}




// 커스텀 렌더러: GitHub 아이콘
class GithubIconRenderer {
  constructor(props) {
    const container = document.createElement("div");
    container.className = "button-container";

    // GitHub 링크가 없으면 아이콘을 렌더링하지 않음
    if (!props.value || props.value === "") {
      this.el = container; // 빈 상태로 렌더링
      return;
    }

    const img = document.createElement("img");
    img.src =
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
    img.alt = "GitHub";
    img.className = "github-icon";

    img.addEventListener("click", () => {
      const link = props.value;
      window.open(link, "_blank");
    });

    container.appendChild(img);
    this.el = container;
  }

  getElement() {
    return this.el;
  }

  render(props) {}
}

// 커스텀 렌더러: 썸네일 이미지
class PreviewRenderer {
  constructor(props) {
    const container = document.createElement("div");
    container.className = "preview-container";

    container.style.display = "flex";
    container.style.justifyContent = "center"; // 가로 정렬
    container.style.alignItems = "center"; // 세로 정렬
    container.style.width = "150px";
    container.style.height = "101px";
    container.style.backgroundColor = "#000"; // 검은색 배경
    container.style.color = "#fff"; // 텍스트 색상은 흰색
    container.style.fontSize = "14px"; // 텍스트 크기
    container.style.fontWeight = "bold"; // 텍스트 굵게
    container.style.textAlign = "center"; // 텍스트 가운데 정렬
    container.style.lineHeight = "101px"; // 텍스트 수직 중앙 정렬

    // 썸네일 이미지가 없으면 "No Image Available" 텍스트로 대체
    if (!props.value || props.value === "") {
      const noImageText = document.createElement("span");
      noImageText.textContent = "No Image Available";
      container.appendChild(noImageText);
    } else {
      const img = document.createElement("img");
      img.src = props.value;
      img.alt = "Preview";
      img.style.width = "150px";
      img.style.height = "101px";
      img.style.objectFit = "cover"; // 이미지 비율 유지
      container.appendChild(img);
    }

    this.el = container;
  }

  getElement() {
    return this.el;
  }

  render(props) {}
}


// 컬럼 정의에 썸네일 이미지 컬럼 추가
const columns = [
  {
    header: "Type",
    name: "type",
    width: 200,
    filter: {
      type: "select",
      showApplyBtn: true,
      showClearBtn: true,
    }, // 필터 추가
    sortingType: "asc", // 기본 정렬 방식 설정
    sortable: true, // 정렬 가능하도록 설정,
  },
  {
    header: "Title",
    name: "title",
    filter: {
      type: "select",
      showApplyBtn: true,
      showClearBtn: true,
    }, // 필터 추가
    sortingType: "asc",
    sortable: true,
  },
  {
    header: "GitHub",
    name: "github",
    width: 100,
    renderer: {
      type: GithubIconRenderer,
    },
  },
  {
    header: "Go Live",
    name: "link",
    width: 100,
    renderer: {
      type: LinkButtonRenderer,
    },
  },
  {
    header: "Preview", // 새로 추가한 컬럼
    name: "preview", // 데이터에서 썸네일 필드 이름
    width: 160,
    renderer: {
      type: PreviewRenderer,
    },
  },
];

// TUI Grid 초기화
fetch("json/gridData.json")
  .then((response) => response.json())
  .then((data) => {
    // 데이터를 역순으로 정렬
    const reversedData = data.reverse();

    const grid = new tui.Grid({
      el: document.getElementById("grid"),
      data: reversedData,  // 역순으로 정렬된 데이터를 사용
      columns,
      rowHeaders: ["rowNum"],
      bodyHeight: "fitToParent",
      rowHeight: 110,
    });
  })
  .catch((error) => {
    console.error("Error loading JSON data:", error);
  });
