// 커스텀 렌더러: 링크 버튼
class LinkButtonRenderer {
  constructor(props) {
    const container = document.createElement("div");
    container.className = "button-container";

    // 바로가기 링크가 없으면 버튼을 렌더링하지 않음
    if (!props.value || props.value === "") {
      this.el = container; // 빈 상태로 렌더링
      return;
    }

    const el = document.createElement("button");
    el.textContent = "Go";
    el.style.padding = "2px 5px";
    el.style.fontSize = "12px";
    el.style.height = "25px";
    el.style.width = "50px";
    el.style.backgroundColor = "#007BFF";
    el.style.color = "#fff";
    el.style.border = "none";
    el.style.borderRadius = "4px";
    el.style.cursor = "pointer";

    el.addEventListener("click", () => {
      const link = props.value;
      window.open(link, "_blank");
    });

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
class ThumbnailRenderer {
  constructor(props) {
    const container = document.createElement("div");
    container.className = "thumbnail-container";

    // 이미지 컨테이너 가운데 정렬
    container.style.display = "flex";
    container.style.justifyContent = "center"; // 가로 정렬
    container.style.alignItems = "center"; // 세로 정렬

    // 썸네일 이미지가 없으면 빈 상태로 렌더링
    if (!props.value || props.value === "") {
      this.el = container;
      return;
    }

    const img = document.createElement("img");
    img.src = props.value;
    img.alt = "Thumbnail";
    img.style.width = "150px"; // 썸네일 이미지 크기 조정 (넓이)
    img.style.height = "101px"; // 썸네일 이미지 크기 조정 (높이)
    img.style.objectFit = "cover"; // 이미지 비율 유지

    container.appendChild(img);
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
    header: "바로가기",
    name: "link",
    width: 100,
    renderer: {
      type: LinkButtonRenderer,
    },
  },
  {
    header: "Thumbnail", // 새로 추가한 컬럼
    name: "thumbnail", // 데이터에서 썸네일 필드 이름
    width: 160,
    renderer: {
      type: ThumbnailRenderer,
    },
  },
];

// TUI Grid 초기화
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const grid = new tui.Grid({
      el: document.getElementById("grid"),
      data,
      columns,
      rowHeaders: ["rowNum"],
      bodyHeight: "fitToParent",
      rowHeight: 110, // 행 높이를 썸네일 크기인 101px로 설정
    });
  })
  .catch((error) => {
    console.error("Error loading JSON data:", error);
  });
