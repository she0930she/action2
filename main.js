//window.alert("this is js!!")
$("#formsubmit").submit(function (e) {
  e.preventDefault();
  //console.log("clicked")
  const user = $("#user option:selected").text();
  const secA1 = $("#secA1").val();
  const secA2 = $("#secA2").val();
  const secA3 = $("#secA3").val();
  const secA4 = $("#secA4").val();
  const secA5 = $("#secA5").val();
  const secB1 = $("#secB1").val();
  const secB2 = $("#secB2").val();
  const secB3 = $("#secB3").val();
  const secB4 = $("#secB4").val();
  const secB5 = $("#secB5").val();
  const postNumber = $("#postNumber option:selected").text()
  const selC = $("#selC option:selected").text()
  const storyN1 = $("#storyN1 option:selected").text()
  const selD1 = $("#selD1 option:selected").text()
  const storyN2 = $("#storyN2 option:selected").text()
  const selD2 = $("#selD2 option:selected").text()
  const selE = [];
  document.querySelectorAll('input[name=selEName]').forEach(input => {
    console.log("dir")
    console.dir(input);
    let d = 'No';
    if (input.checked) {
      //d = input.value;
      d = "Yes"
    }
    selE.push(d);
  });
  // console.log(selE);
  //目標讓有選到"on",沒選到的變成"off",最後render出來0...,1...
  //如何讓on 變成Yes, no
  // if ($("input[name='selEName']:checked")) {
  //   // $.each($("input[name='selEName']:checked"), function () {
  //   //   selE.push($(this).val());
  //   // })
  //   // console.log('[selE]', selE);
  // } else {
  //   selE.push("off")
  // }
  // $.each($("input[name='selEName']:checked"), function () {
  //   selE.push($(this).val());
  // })
  console.log("selE", selE)
  //const selE = $("selEName:checkbox").text()
  const obj = {
    user,
    secA1, secA2, secA3, secA4, secA5,
    secB1,
    secB2,
    secB3,
    secB4,
    secB5,
    postNumber, selC,
    storyN1, selD1, storyN2, selD2,
    selE,
    createdAt: new Date().getTime(),
  };
  console.log("obj", obj)
  db.collection("sectionA").add(obj)
    .then(() => {
      console.log("success")
      alert('已成功上傳！可以至 "原始資料"查詢')
      //TODO:how to disable preventdefault??
      $("input").val("");

    })
    .catch(err => {
      console.log(err)
      alert("上傳失敗，請再傳送一次！")
    });
});

db.collection("sectionA").get()
  .then(collection => {
    const secARender = [];
    collection.forEach(doc => {
      //console.log("secAdoc", doc)
      const secA = doc.data();
      secARender.push(secA);
    })
    //console.log("secARender", secARender)
    secARender.forEach(oneDocu => {
      $("#secARender").append(`
      <li>${oneDocu.user}
      <h4>3~5個人有效聊天及邀約</h4>
      1:${oneDocu.secA1}  ,2:${oneDocu.secA2}  ,3:${oneDocu.secA3}
      4:${oneDocu.secA4}
      5:${oneDocu.secA5}
      <h4>留言互動20人</h4>
      1:${oneDocu.secB1},2:${oneDocu.secB2},3:${oneDocu.secB3}
      4:${oneDocu.secB4}
      5:${oneDocu.secB5}
      <h4>貼文/Post</h4>
      貼文數：${oneDocu.postNumber},  主題：${oneDocu.selC}
      <h4>限時動態/story</h4>
      動態數：${oneDocu.storyN1},  主題：${oneDocu.selD1}
      <br>
      動態數：${oneDocu.storyN2},  主題：${oneDocu.selD2}
      <br>
      <h4>行動總結</h4>
      留言互動20人（發文或限時動態回覆）:${oneDocu.selE[0]},
      <br>
      按讚人數20人:${oneDocu.selE[1]},
      <br>
      加好友100人:${oneDocu.selE[2]},
      <br>
      發文1~2:${oneDocu.selE[3]},
      <br>
      限時動態 2~5種（保持永遠有限動的狀態）:${oneDocu.selE[4]},
      <br>
      敲3~5個人有效聊天及邀約（可同人或不同人）:${oneDocu.selE[5]},
      <br>
      群組分享每日產品:${oneDocu.selE[6]}
      </li>
      <br>
      `);
    })
  })
  .catch(err => {
    console.log("err", err)
  })
// 限時動態數：${oneDocu.storyN1}, 主題：${oneDocu.selD1}
// 限時動態數：${oneDocu.storyN2}, 主題：${oneDocu.selD2}


$('#demoForm').submit(function (e) {
  e.preventDefault();
  const name = $("#demoFormName").val();
  const age = parseInt($("#demoFormAge").val());
  const obj = {
    name,
    age,
    createdAt: new Date().getTime()
  };
  console.log(obj);
  db.collection("demo").add(obj)
    .then(() => {
      console.log('Success');
    })
    .catch(err => {
      console.log(err);
    });
});

db.collection("demo").get()
  .then(collection => {
    const demoList = [];
    collection.forEach(doc => {
      //console.log("demo", doc)
      const demo = doc.data();
      demoList.push(demo);
    });
    console.log(demoList);
    //console.log("Yeahhh")
    demoList.forEach(demo => {
      //console.log("demo", demo);
      $('#demoListOL').append(`<li>
      Name: ${demo.name} Age: ${demo.age}
      </li>`);
    })

  })
  .catch(err => {
    console.log(err);
  })


//History.index

$("#searchBtn").click(function (e) {
  //window.alert("this is js!!")
  console.log("searchBtn")
  e.preventDefault();
  const user = $("#user option:selected").text();
  console.log("user", user)
  // "only" render certain document of this user
  db
    .collection("sectionA")
    .where("user", "==", user)
    // .orderBy("createdAt", "desc")
    .get()
    .then(collection => {
      collection.forEach(doc => {
        const id = doc.id;
        const data = doc.data();
        console.log('[data]', data);
        let now = data.createdAt
        let time = moment(now).format("YYYY.MM.DD")
        //TODO:add moment
        $('#historyRender').append(`
        <div class="">
        <br>
        <li>${data.user} 
        <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${id}">刪除這筆資料</button>
        ${time}
        <br>
        <h4>3~5個人有效聊天及邀約</h4>
        1:${data.secA1}  <br>
        2:${data.secA2}  <br>
        3:${data.secA3} <br>
        4:${data.secA4} <br>
        5:${data.secA5}
        <h4>留言互動20人</h4>
        1:${data.secB1}       <br>
        2:${data.secB2}       <br>
        3:${data.secB3}      <br>
        4:${data.secB4}      <br>
        5:${data.secB5}
        <h4>貼文/Post</h4>
        貼文數：${data.postNumber} <br>
        主題：${data.selC}
        <h4>限時動態/story</h4>
        動態數：${data.storyN1},  <br>
        主題：${data.selD1}
        <br>
        動態數：${data.storyN2},  <br>
        主題：${data.selD2}
        <br>
        <h4>行動總結</h4>
        留言互動20人（發文或限時動態回覆）:  ${data.selE[0]}
        <br>
        按讚人數20人:  ${data.selE[1]}
        <br>
        加好友100人:  ${data.selE[2]}
        <br>
        發文1~2:  ${data.selE[3]}
        <br>
        限時動態 2~5種（保持永遠有限動的狀態）:  ${data.selE[4]}
        <br>
        敲3~5個人有效聊天及邀約（可同人或不同人）:  ${data.selE[5]}
        <br>
        群組分享每日產品:  ${data.selE[6]}
        
        </li>
        </div>
        `)
      })
    })
    .catch(err => {
      console.log('[err]', err);
    })
})
//TODO:選到deleteBtn, and delete
$("body").delegate(".delete-btn", "click", function () {
  const id = $(this).attr("data-id");

  db
    .doc(`sectionA/${id}`)
    .delete()
    .then(res => {
      console.log('success!')
      alert("成功刪除了，請再更新一次")
      location.reload();
    })
    .catch(err => {
      console.log('err', err);
    })
})
//reload

// db.collection("sectionA").get()
//   .then(collection => {
//     const secRender = []
//     collection.forEach(doc => {
//       //console.log("doc.data()", doc.data())
//       const userOnDocu = doc.data().user
//       console.log("userOnDocu", userOnDocu)
//       if (user == userOnDocu) {
//         console.log("sec", sec)
//         const sec = doc.data();
//         secRender.push(sec);
//         //console.log("secRender", secRender)

//         //render the document only user specific
//         secRender.forEach(oneDocu => {
//           $("#historyRender").append(`
//           <li>${oneDocu.user}
//           <h4>3~5個人有效聊天及邀約</h4>
//           1:${oneDocu.secA1}  ,2:${oneDocu.secA2}  ,3:${oneDocu.secA3}
//           4:${oneDocu.secA4}
//           5:${oneDocu.secA5}
//           <h4>留言互動20人</h4>
//           1:${oneDocu.secB1},2:${oneDocu.secB2},3:${oneDocu.secB3}
//           4:${oneDocu.secB4}
//           5:${oneDocu.secB5}
//           <h4>貼文/Post</h4>
//           貼文數：${oneDocu.postNumber},  主題：${oneDocu.selC}
//           <h4>限時動態/story</h4>
//           動態數：${oneDocu.storyN1},  主題：${oneDocu.selD1}
//           <br>
//           動態數：${oneDocu.storyN2},  主題：${oneDocu.selD2}
//           <br>
//           <h4>行動總結</h4>
//           留言互動20人（發文或限時動態回覆）:${oneDocu.selE[0]},
//           <br>
//           按讚人數20人:${oneDocu.selE[1]},
//           <br>
//           加好友100人:${oneDocu.selE[2]},
//           <br>
//           發文1~2:${oneDocu.selE[3]},
//           <br>
//           限時動態 2~5種（保持永遠有限動的狀態）:${oneDocu.selE[4]},
//           <br>
//           敲3~5個人有效聊天及邀約（可同人或不同人）:${oneDocu.selE[5]},
//           <br>
//           群組分享每日產品:${oneDocu.selE[6]}
//           </li>
//           <br>
//           `);
//         })
//       }
//       console.log("secRender", secRender)
//     })

//   })
//   .catch(err => {
//     console.log("err", err)
//   })