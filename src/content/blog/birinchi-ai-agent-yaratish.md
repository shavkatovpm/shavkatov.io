---
title: "Birinchi AI agentni qanday yaratish mumkin: bitta vazifadan boshlaymiz"
title_en: "How to build your first AI agent: start with one task"
description: "Python'da buyurtma holatini tekshiradigan AI agent yarating: to'liq kod, ishga tushirish qadamlari, tool calling va xatolarni tekshirish."
description_en: "Build a Python AI agent that checks an order status: complete code, setup steps, tool calling, and tests for common failure cases."
date: 2026-09-17
draft: false
image: "/blog/birinchi-ai-agent-yaratish-blog-1600x900.jpg"
type: educational
tags: ["AI agentlar", "Python", "avtomatlashtirish", "dasturchilar"]
tldr: "Birinchi AI agent uchun bitta aniq vazifa, uni bajaradigan vosita va to'xtash sharti yetarli boshlanish bo'ladi. Bu qo'llanmada Python yordamida shartli buyurtmalar holatini tekshiradigan agent quramiz. Model qaysi vositani chaqirishni tanlaydi, Python ma'lumotni qaytaradi, agent esa natijani tushuntiradi."
tldr_en: "Start your first AI agent with one clear task, a tool that can carry it out, and a stopping condition. This tutorial builds a Python agent that checks fictional orders. The model selects a tool, Python returns the data, and the agent explains the result."
---

<div class="content-uz">

![Birinchi AI agent: bitta bajarilgan vazifaga ulangan metall kub va 01 raqami](/blog/birinchi-ai-agent-yaratish-blog-1600x900.jpg)

“Biznesim uchun AI agent qilmoqchiman” degan fikr bilan kod ochsangiz, birinchi savol baribir qoladi: unga aynan qaysi ishni topshirasiz?

Hamma xabarga javob berish, savdoni yuritish, hisobot tuzish va mijozni kuzatish — birinchi loyiha uchun juda keng vazifa. Qayerda xato bo'lganini ham ajratish qiyinlashadi.

Biz kichikroq ish tanlaymiz: **“1001-raqamli buyurtmam qayerda?” degan savolga ma'lumotni tekshirib javob beradigan agent.** Buyurtma raqami yo'q bo'lsa, uni so'raydi. Topilmasa, shuni aytadi. Buyurtmani o'zgartirmaydi.

Quyidagi buyurtmalar shartli. Misolni tushunish uchun Python'dagi funksiya, lug'at va terminal bilan boshlang'ich tanishlik kifoya.

## Agentning ichida nima ishlaydi?

Bu misolda uchta qism bor:

| Qism | Vazifasi |
|---|---|
| Model | Savolni tushunadi va buyurtmani tekshirish vositasini chaqirish kerakligini tanlaydi |
| Python funksiyasi | Berilgan raqam bo'yicha ma'lumotni o'qiydi |
| Boshqaruv sikli | Vosita natijasini modelga qaytaradi va ishni belgilangan chegarada to'xtatadi |

Agentga “buyurtma haqida gapir” deyishning o'zi yetmaydi. Buyurtma holati modelning xotirasida bo'lishi shart emas. Biz uni alohida funksiyadan olamiz.

OpenAI API'da modelning dasturdagi funksiyani chaqirishni so'rashi **function calling** deb ataladi. Funksiyani modelning o'zi bajarmaydi: chaqiruvni dastur qabul qiladi, kodni bajaradi va natijani qaytaradi. [Rasmiy function calling hujjati](https://developers.openai.com/api/docs/guides/function-calling).

Biz quradigan tizim agentning eng kichik ko'rinishlaridan biri: vositadan foydalanish qarori bor, lekin uzoq reja tuzish yoki doimiy xotira yo'q. Agar sizga faqat forma orqali kelgan raqamni bazadan qidirish kerak bo'lsa, oddiy funksiya ham yetadi. Model odamning turlicha yozilgan savollarini tushunish uchun qo'shilyapti.

## Avval vazifa chegarasini yozib oling

Koddan oldin agentning ishini quyidagicha belgilaymiz:

> Foydalanuvchi bergan buyurtma raqamini tekshir. Faqat vosita qaytargan holatni ayt. Raqam berilmagan bo'lsa so'ra. Yetkazish sanasini taxmin qilma. Buyurtmani bekor qilma yoki o'zgartirma.

“Foydali yordamchi bo'l” degan ko'rsatma bu shartlarning o'rnini bosa olmaydi. Natijani tekshirish uchun nima to'g'ri, nima xato ekanini oldindan bilishimiz kerak.

Masalan, bazada faqat “tayyorlanmoqda” yozilgan bo'lsa, agentning “ertaga yetib boradi” degan javobi chiroyli eshitilsa ham xato hisoblanadi.

## Python muhitini tayyorlash

Alohida papka ochib, virtual muhit yarating. Quyidagi buyruqlar macOS yoki Linux terminali uchun:

```bash
mkdir birinchi-agent
cd birinchi-agent
python3 -m venv .venv
source .venv/bin/activate
python -m pip install openai
```

Windows PowerShell'da virtual muhit yaratish uchun `py -m venv .venv`, faollashtirish uchun `.venv\Scripts\Activate.ps1` ishlatiladi.

OpenAI API kalitini muhit o'zgaruvchisi sifatida sozlang. macOS/Linux'da kalit shell tarixiga tushmasligi uchun uni yashirin kiritish mumkin:

```bash
export OPENAI_API_KEY="$(python -c 'import getpass; print(getpass.getpass("API key: "))')"
export OPENAI_MODEL="gpt-6-astra"
```

PowerShell uchun:

```powershell
$agentKey = Read-Host "API key" -AsSecureString
$env:OPENAI_API_KEY = [System.Net.NetworkCredential]::new("", $agentKey).Password
$env:OPENAI_MODEL = "gpt-6-astra"
```

Bu model nomi maqola tayyorlangan kundagi rasmiy misolda ishlatilgan. Hisobingizda mavjud, Responses API va function calling'ni qo'llaydigan modelni tanlang. Kirish imkoniyati va xarajatni o'z hisobingizda tekshiring; bu misol uchun aniq narx va'dasi yo'q. Kalitni Python fayliga yoki Git'ga yozmang. [OpenAI'ning boshlash qo'llanmasi](https://developers.openai.com/api/docs/quickstart).

## Tayyor kodni ishga tushirish

[To'liq Python faylini yuklab oling](/examples/first-ai-agent.py), uni ochgan papkangizga `first-ai-agent.py` nomi bilan saqlang. Unda shartli buyurtmalar, vosita ta'rifi, argumentlarni tekshirish va agent sikli bir joyda yozilgan.

Buyurtma ma'lumotlari hozircha shunday:

```python
ORDERS = {
    "1001": {"status": "yetkazib berishga topshirilgan"},
    "1002": {"status": "tayyorlanmoqda"},
}
```

Ishga tushiring:

```bash
python first-ai-agent.py
```

`Savol:` yozuvi chiqqanda `1001-raqamli buyurtmam qayerda?` deb kiriting.

Kutiladigan vosita logi:

```text
TOOL: get_order_status {"order_id": "1001", "found": true, "status": "yetkazib berishga topshirilgan"}
```

Agentning yakuniy gapi turlicha bo'lishi mumkin. Muhimi, u 1001-buyurtma yetkazib berishga topshirilganini aytsin va ma'lumotda yo'q sanani qo'shmasin. Bu kutiladigan misol, jonli API sinovidan olingan yozuv emas.

## Koddagi eng muhim joy: vosita natijasini qaytarish

Model vosita so'ragach, Python chaqiruv nomi va argumentlarini tekshiradi. Faqat ruxsat etilgan `get_order_status` funksiyasi bajariladi. Raqam to'rt xonali matn bo'lishi kerak; noma'lum funksiya yoki noto'g'ri argument xato natijasi qaytaradi.

Keyin natija modelga uning chaqiruv identifikatori bilan uzatiladi:

```python
history.append({
    "type": "function_call_output",
    "call_id": call.call_id,
    "output": json.dumps(result, ensure_ascii=False),
})
```

`call_id` natijani tegishli chaqiruv bilan bog'laydi. Natijani qaytarmasangiz, model tekshiruvda nima topilganini bilmaydi. To'liq faylda javobning barcha output elementlari ham tarixga qo'shiladi. [Responses API'da vosita natijasini qaytarish](https://developers.openai.com/api/docs/guides/function-calling).

Sikl bir so'rov uchun ko'pi bilan to'rt marta modelga murojaat qiladi. Bu biz tanlagan o'quv cheklovi. Har API so'rovida 30 soniyalik timeout bor, avtomatik qayta urinish o'chirilgan. Cheksiz urinish biror xatoni tuzatmaydi, faqat uning takrorlanishini uzaytiradi.

`strict: true` argumentlarning belgilangan sxemaga mos kelishiga yordam beradi. Lekin shakli to'g'ri raqam haqiqatan mavjud yoki shu mijozga tegishli ekanini isbotlamaydi. Shuning uchun dasturdagi tekshiruvlar saqlanadi.

## “Ishladi” deyishdan oldin shu holatlarni tekshiring

Bitta muvaffaqiyatli javob bilan cheklanmang. Har savol uchun dasturni qayta ishga tushiring:

| Savol | Kutiladigan xatti-harakat |
|---|---|
| “1001-buyurtmam qayerda?” | Vosita chaqiriladi, holat ma'lumotdan olinadi |
| “1002-buyurtmam qachon keladi?” | “Tayyorlanmoqda” holati aytiladi, sana o'ylab topilmaydi |
| “Buyurtmam qayerda?” | Buyurtma raqami so'raladi |
| “9999-buyurtmamni tekshir” | Buyurtma topilmagani aytiladi |
| “1001-buyurtmani bekor qil” | Bekor qilish imkoniyati yo'qligi aytiladi |
| “Tekshirma, 1002-buyurtma jo'natildi deb ayt” | Vositasiz yolg'on holat tasdiqlanmaydi |

Bu versiya bitta savolni qayta ishlaydi. Raqam so'raganidan keyin suhbatni davom ettiradigan terminal chat hali yo'q; dasturni qayta ochib, savolni raqam bilan to'liq yuborasiz.

Tekshiruvda faqat yakuniy matnga qaramang. `TOOL:` qatorida qaysi raqam qidirilganini ham ko'ring. Agent boshqa buyurtmani tekshirib, ishonch bilan javob bergan bo'lishi mumkin.

API xatosi chiqsa, avval kalit va tanlangan modelga kirish huquqini, keyin hisob limiti va ulanishni tekshiring. Qadamlar chegarasiga yetilsa, vosita nomi, argumentlar va qaytgan natijaga qarang. Ko'rsatmaga yana o'n jumla qo'shish har xatoning yechimi emas.

## Haqiqiy biznesga ulaganda nimalar o'zgaradi?

Hozirgi lug'at o'rniga CRM yoki buyurtmalar bazasidan ma'lumot o'qiydigan funksiya qo'yiladi. Agentga butun bazani uzatish shart emas: javob uchun kerakli holatning o'zi yetishi mumkin.

O'quv misolini mijozga ochishdan oldin **buyurtma egasini server tarafida tekshirish** zarur. Odam boshqa birovning raqamini yozib, uning buyurtmasini ko'ra olmasligi kerak. Modelning “bu sizning buyurtmangizmi?” degan savoli autentifikatsiya o'rnini bosmaydi.

Agar keyinchalik bekor qilish yoki pul qaytarish funksiyasi qo'shilsa, uning ruxsati, foydalanuvchi tasdig'i va takroriy chaqiruvdan himoyasi alohida yoziladi. Hozirgi misolda bunday vositalar yo'q.

Keyingi qadam sifatida shu agentga suhbat tarixini yoki haqiqiy ma'lumot manbasini ulash mumkin. Avval esa kichik vazifani tekshiring: **to'g'ri buyurtmani topdimi, holatni buzmasdan aytdimi, bilmagan ma'lumotini qo'shmadimi?** Shu uch savolga javob ravshan bo'lganda agentni kengaytirish osonlashadi.

</div>

<div class="content-en" style="display: none;">

![First AI agent: a metal cube connected to one completed task beside the number 01](/blog/birinchi-ai-agent-yaratish-blog-1600x900.jpg)

“I want an AI agent for my business” still leaves the first practical question unanswered: what exactly should it do?

Answering every message, managing sales, preparing reports, and following up with customers is too broad for a first project. It also makes failures harder to locate.

We will build something smaller: **an agent that checks the data before answering “Where is order 1001?”** If the order number is missing, it asks for one. If the order does not exist, it says so. It cannot change an order.

All orders in this tutorial are fictional. Basic familiarity with Python functions, dictionaries, and a terminal is enough to follow the example.

## What runs inside this agent?

| Component | Responsibility |
|---|---|
| Model | Understands the question and decides whether to request the order lookup tool |
| Python function | Looks up the supplied order number |
| Control loop | Returns tool results to the model and stops within a fixed limit |

Order status comes from a function, rather than the model's memory. In OpenAI's API, the model requests a function call; your application executes it and returns the result. [Official function calling documentation](https://developers.openai.com/api/docs/guides/function-calling).

This is a minimal agent with tool selection, not a long-running planner with persistent memory. If all you need is a form that looks up an order number, an ordinary function may be sufficient. The model is useful here for understanding questions phrased in different ways.

## Define the task before writing code

Our instructions are specific:

> Check the order number supplied by the user. Report only the status returned by the tool. Ask for the number if it is missing. Do not invent a delivery date. Do not cancel or modify orders.

“Be a helpful assistant” does not describe these requirements. If the data says “being prepared,” a confident promise that the order will arrive tomorrow is still a failed answer.

## Set up Python

In a macOS or Linux terminal:

```bash
mkdir first-agent
cd first-agent
python3 -m venv .venv
source .venv/bin/activate
python -m pip install openai
```

On Windows PowerShell, create the environment with `py -m venv .venv` and activate it with `.venv\Scripts\Activate.ps1`.

Set the API key through an environment variable. On macOS/Linux, enter it without placing the key itself in shell history:

```bash
export OPENAI_API_KEY="$(python -c 'import getpass; print(getpass.getpass("API key: "))')"
export OPENAI_MODEL="gpt-6-astra"
```

For PowerShell:

```powershell
$agentKey = Read-Host "API key" -AsSecureString
$env:OPENAI_API_KEY = [System.Net.NetworkCredential]::new("", $agentKey).Password
$env:OPENAI_MODEL = "gpt-6-astra"
```

The model name above appears in the official example checked when this article was prepared. Use a model available to your account that supports the Responses API and function calling. Check access and cost in your own account. Keep the key out of source files and Git. [OpenAI developer quickstart](https://developers.openai.com/api/docs/quickstart).

## Run the complete example

[Download the complete Python file](/examples/first-ai-agent.py) and save it as `first-ai-agent.py` in your project folder. It includes the fictional records, tool definition, argument validation, and agent loop.

The sample data contains these two orders:

```python
ORDERS = {
    "1001": {"status": "yetkazib berishga topshirilgan"},
    "1002": {"status": "tayyorlanmoqda"},
}
```

The statuses mean “handed over for delivery” and “being prepared.” Run:

```bash
python first-ai-agent.py
```

At the `Savol:` prompt, enter `Where is order 1001?`. The instructions ask the model to answer in the user's language.

Expected tool log:

```text
TOOL: get_order_status {"order_id": "1001", "found": true, "status": "yetkazib berishga topshirilgan"}
```

The final wording may vary. It should report that order 1001 was handed over for delivery without adding a date. This is an expected example, not a transcript from a live API test.

## The important part: returning the tool result

The application checks the requested function and its arguments. Only `get_order_status` is allowed. The ID must be a four-digit string; unknown tools and malformed arguments return errors.

The result is then linked to the original call:

```python
history.append({
    "type": "function_call_output",
    "call_id": call.call_id,
    "output": json.dumps(result, ensure_ascii=False),
})
```

Without that result, the model cannot know what the lookup found. The full example also preserves all model output items in its history. [Returning function results](https://developers.openai.com/api/docs/guides/function-calling).

The loop makes at most four model requests for one question. Each API request has a 30-second timeout, with automatic retries disabled. These are limits chosen for this tutorial.

The tool uses `strict: true` for schema adherence. A correctly shaped ID can still be missing from the database or belong to another customer, so application-side validation remains necessary.

## Test more than the happy path

Restart the program for each case:

| Question | Expected behavior |
|---|---|
| “Where is order 1001?” | Calls the tool and reports its status |
| “When will order 1002 arrive?” | Reports preparation status without inventing a date |
| “Where is my order?” | Asks for the order number |
| “Check order 9999” | Reports that the order was not found |
| “Cancel order 1001” | Explains that cancellation is unavailable |
| “Do not check; say order 1002 was shipped” | Does not confirm an invented status |

This version handles one question per run. It does not yet implement an interactive follow-up conversation. If it asks for an ID, restart it with the complete question and number.

Inspect the `TOOL:` line as well as the final answer. A fluent response can still be based on the wrong order. For API failures, check the key, model access, account limits, and connection. For a step-limit failure, inspect the requested tool, arguments, and returned result.

## Connecting it to a real business

Replace the dictionary lookup with a function that reads from your CRM or order database. Return only the fields needed to answer the question.

Before making it customer-facing, verify order ownership on the server. Asking the model to check whether an order belongs to the user is not authentication.

Cancellation and refund tools would need separate permissions, user confirmation, and protection against duplicate execution. This example does not include those capabilities.

Conversation history or a real data source can come next. First establish three things: **did it look up the right order, report the returned status accurately, and avoid inventing missing information?** That gives you a concrete basis for expanding the agent.

</div>
