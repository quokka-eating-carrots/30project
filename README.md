# 30project

# Date Picker

## snowpack 을 활용하여 코딩

[snowpack](https://www.snowpack.dev/)

```
$ npm i -D snowpack
$ npm i -D @snowpack/plugin-sass
```

```
$ npm i -D eslint
$ npm i --save-exact prettier
$ npm i -D eslint-config-prettier eslint-plugin-prettier
```

---

```javascript
 updateDates () {
    this.datesEl.innerHTML = '';
    const numberOfDates = new Date(
      this.#calendarDate.year, // 월에 해당하는 정보 불러오기
      this.#calendarDate.month + 1, // 달에 해당하는 정보 불러오기
      0 // 일자
    ).getDate();
 }
```

강의에서 사용한 일요일 선택 방법

```javascript
colorSun() {
  const sundayEls = this.datesEl.querySelectorAll (
    `.date:nth-child(7n + ${(8 - new Date(
      this.#calendarDate.year,
      this.#calendarDate.month,
      1
    ).getDay()) % 7
    })`,
    );
}
```
