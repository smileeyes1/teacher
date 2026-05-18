/**
 * نظام المعلم البديل الذكي - كود المحرك وإدارة الحالة والمخرجات التربوية المتقدمة
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // مصفوفة ذاكرة النظام المحلية المدمجة للمتعلمين (إحصائيات بالأرقام المشرقية)
    let studentsState = [
        { name: 'زيد أحمد غنام', level: 'متوسط الاستجابة', stage: 'شبه المحسوس (الرسوم)', strengths: 'الربط البصري السريع', remediation: 'تكثيف الانتقال لرموز الطرح المجردة' },
        { name: 'مريم يوسف عواد', level: 'متقدم فائق', stage: 'المجرد الرمزي المعرفي', strengths: 'التفكير الاستنتاجي النقدي', remediation: 'إدراج أنشطة تحدي ممتدة وعميقة' },
        { name: 'عمر مصطفى كميل', level: 'بحاجة لدعم حسي', stage: 'المحسوس العيني المادي', strengths: 'التفاعل الحركي مع الأدوات', remediation: 'استخدام بطاقات الشطب الملونة المكثفة' }
    ];

    // فلتر تحويل وتأمين الأرقام المشرقية حصرياً (٠١٢٣٤٥٦٧٨٩) لضمان ثبات المظهر البصري والتربوي
    function convertToEasternArabicDigits(text) {
        if (!text) return 'ـ';
        const western = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const eastern = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        let output = text.toString();
        for (let i = 0; i < 10; i++) {
            output = output.replace(new RegExp(western[i], 'g'), eastern[i]);
        }
        return output;
    }

    // إدارة نظام التنقل والموجهات الجانبية للوحات
    const navLinks = document.querySelectorAll('.nav-link');
    const panels = document.querySelectorAll('.workspace-panel');
    const welcomeTitle = document.getElementById('welcomeTitle');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            panels.forEach(p => p.classList.add('hidden'));
            
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.remove('hidden');
            
            // تحديث ترويسة العنوان المدمجة بناء على الهدف المختار
            welcomeTitle.innerText = link.innerText;
        });
    });

    // بناء وحقن جدول المتعلمين داخل اللوحة المخصصة
    function renderStudentsMatrix() {
        const tbody = document.querySelector('#studentsMatrixTable tbody');
        tbody.innerHTML = '';
        studentsState.forEach(st => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${st.name}</strong></td>
                <td>${st.level}</td>
                <td><span style="color: #2563eb; font-weight: bold;">${st.stage}</span></td>
                <td>${st.strengths}</td>
                <td><span style="color: #10b981;">${st.remediation}</span></td>
            `;
            tbody.appendChild(row);
        });
    }
    renderStudentsMatrix();

    // إضافة طالب جديد ديناميكياً للسجل التشخيصي لضمان المرونة الكاملة
    document.getElementById('addNewStudentBtn').addEventListener('click', () => {
        const sName = prompt('أدخل اسم الطالب المأمول إضافته:');
        if (sName) {
            studentsState.push({
                name: sName,
                level: 'قيد التقييم التشخيصي',
                stage: 'المحسوس المادي',
                strengths: 'تفاعل أولي ملموس',
                remediation: 'مراقبة مستوى الانتقال شبه المحسوس'
            });
            renderStudentsMatrix();
        }
    });

    // =========================================================
    // محرك القرار التربوي التكيفي للشرح وبناء الخطط المعرفية المتدرجة
    // =========================================================
    const generateExplanationBtn = document.getElementById('generateExplanationBtn');
    const explanationResultWrapper = document.getElementById('explanationResultWrapper');
    const explanationDynamicContainer = document.getElementById('explanationDynamicContainer');

    generateExplanationBtn.addEventListener('click', () => {
        const subj = document.getElementById('explainerSubject').value.trim();
        const grade = document.getElementById('explainerGrade').value;
        const topic = document.getElementById('explainerTopic').value.trim();

        if (!subj || !topic) {
            alert('❌ يرجى ملء حقول المادة وعنوان الدرس المعرفي لتشغيل معالج التلقين.');
            return;
        }

        // صياغة البنية المتدرجة آلياً (محسوس -> شبه محسوس -> مجرد) حسب مدخلات المعلم
        explanationDynamicContainer.innerHTML = `
            <div class="cognitive-node-block">
                <h6>١. مرحلة التعلّم المحسوس المادي والعيني (Concrete Stage):</h6>
                <p>نبدأ بجلب أدوات حقيقية يمسكها طلبة الصف (${convertToEasternArabicDigits(grade)}) بأيديهم؛ نعرض لدرس (${topic}) باستخدام مجسمات ملموسة وعناصر بيئية مباشرة من الغرفة الصفية ليقوم الطالب بلمسها وعدّها وحركتها لتجسيد الفكرة في ذهنه كلياً.</p>
            </div>
            <div class="cognitive-node-block semi">
                <h6>٢. مرحلة التعلّم شبه المحسوس البصري والسياقي (Semi-Concrete Stage):</h6>
                <p>ننتقل تدريجياً من الأدوات المادية إلى التمثيل البصري؛ نستخدم رسومات توضيحية على السبورة وبطاقات مصورة تحتوي على خطوط للشطب ومواقف سياقية لفظية تترجم جوهر مسألة (${topic}) دون الدخول في الرموز الجافة بعد.</p>
            </div>
            <div class="cognitive-node-block abstract">
                <h6>٣. مرحلة التعلّم التجريدي الرمزي المعرفي (Abstract Stage):</h6>
                <p>الآن نصل إلى البناء النهائي المعمق؛ نرفع الرسوم ونستبدلها بالرموز الرياضية واللغوية الصرفة وقوانين الاستنتاج لدرس (${topic})، حيث يحل المتعلم المسألة الرمزية المجردة (مثال: ٥ - ٢ = ٣) بثقة واعتماداً على البناء التراكمي السابق.</p>
            </div>
        `;
        
        explanationResultWrapper.classList.remove('hidden');
    });

    // محاكاة نظام التحدث المباشر والقراءة الصوتية للمتعلمين لدعم الفروق الفردية
    document.getElementById('speakExplanationBtn').addEventListener('click', () => {
        alert('🔊 محرك النطق مجهز لربطه بالـ Web Speech API لقراءة النص المختار ومساعدة طلبة التأسيس صوتياً في الغرفة الصفية.');
    });

    // =========================================================
    // محرك هندسة الوثائق المطبوعة ومصفوفة الأسئلة الموجهة للطلاب A4
    // =========================================================
    const generateDocumentBtn = document.getElementById('generateDocumentBtn');
    const mainAppWrapper = document.getElementById('mainAppWrapper');
    const enterpriseA4PrintArea = document.getElementById('enterpriseA4PrintArea');
    
    const printMainTitle = document.getElementById('printDocumentMainTitle');
    const printDocGradeField = document.getElementById('printDocGradeField');
    const printDocSubjectField = document.getElementById('printDocSubjectField');
    const printDocTopicField = document.getElementById('printDocTopicField');
    const printPayloadBody = document.getElementById('printDocumentPayloadBody');

    generateDocumentBtn.addEventListener('click', () => {
        const docType = document.getElementById('docTypeSelect').value;
        const docTopic = document.getElementById('docTopicInput').value.trim();
        const explainerSubj = document.getElementById('explainerSubject').value.trim() || 'الرياضيات العامة';
        const explainerGrd = document.getElementById('explainerGrade').value || 'الأول';

        if (!docTopic) {
            alert('❌ يرجى كتابة محدد وعنوان موضوع ورقة العمل ليتم صياغة الأسئلة الموجهة للطلاب.');
            return;
        }

        // حقن البيانات في ترويسة ومحددات وثيقة الـ A4 الرسمية النظيفة
        printMainTitle.innerText = docType;
        printDocGradeField.innerText = convertToEasternArabicDigits(`الصف ${explainerGrd} الابتدائي`);
        printDocSubjectField.innerText = explainerSubj;
        printDocTopicField.innerText = docTopic;
        
        // بناء متن المخرج التعليمي الصافي والخالي تماماً من أي ملاحظات جانبية أو أزرار ويب
        printPayloadBody.innerHTML = `
            <div class="print-question-block">
                <h5>السؤال الأول: تأمل الرسومات الحسية البصرية التالية ثم شطب العناصر المطلوبة لاستخراج الناتج الصحيح (المستوى الحسي):</h5>
                <p style="letter-spacing: 4px; font-size: 16px; margin: 10px 0;">🍎 🍎 🍎 🍎 🍎 🍎</p>
                <p>قم بشطب (٣) تفاحات من المجموعة السابقة، ثم اكتب كم تفاحة بقيت دون شطب في المربع المخصص.</p>
            </div>
            
            <div class="print-question-block">
                <h5>السؤال الثاني: اقرأ المسألة اللفظية السياقية التالية بتمعن ثم صغ الحل المناسب (المستوى شبه المحسوس):</h5>
                <p>مع أحمد (٧) بالونات ملونة طارت منها بالونتان في الهواء أثناء الفسحة المدرسية. كم بالوناً متبقياً في يد أحمد الآن؟ صغ المسألة بالرسوم البيانية البسيطة.</p>
            </div>

            <div class="print-question-block">
                <h5>السؤال الثالث: أوجد ناتج العمليات الرمزية التجريدية التالية مستعيناً بقواعد التفكير المستنتجة (المستوى المجرد):</h5>
                <div style="display: flex; justify-content: space-between; font-size: 14px; margin-top: 12px; font-weight: bold;">
                    <div>أ) ٩ - ٤ = .....</div>
                    <div>ب) ٦ + ٣ = .....</div>
                    <div>ج) ٨ - ٥ = .....</div>
                </div>
            </div>
        `;

        // توليد معرف رقمي سري للمستند للتوثيق والأرشفة بالأرقام المشرقية
        const docCryptoNum = convertToEasternArabicDigits(Math.floor(200000 + Math.random() * 700000));
        document.getElementById('printDocCryptoId').innerText = `المعرف الرقمي: SAT-${docCryptoNum}`;

        // عزل بيئة وتطبيق الويب بالكامل وعرض واجهة المستند الرسمي الصارم
        mainAppWrapper.classList.add('hidden');
        enterpriseA4PrintArea.classList.remove('hidden');
        window.scrollTo(0, 0);
    });

    // التحكم في شريط أدوات الطباعة وإلغاء المعاينة الأكاديمية
    document.getElementById('abortPrintPreviewBtn').addEventListener('click', () => {
        enterpriseA4PrintArea.classList.add('hidden');
        mainAppWrapper.classList.remove('hidden');
    });

    document.getElementById('executePhysicalPrintBtn').addEventListener('click', () => {
        window.print();
    });

    // =========================================================
    // محاكاة مركز رفع واعتماد المناهج والكتب المدرسية وتفكيك الوحدات
    // =========================================================
    const dropZoneArea = document.getElementById('dropZoneArea');
    const bookFileInput = document.getElementById('bookFileInput');
    const bookAnalysisResult = document.getElementById('bookAnalysisResult');
    const curriculumStepsContainer = document.getElementById('curriculumStepsContainer');

    dropZoneArea.addEventListener('click', () => bookFileInput.click());
    
    bookFileInput.addEventListener('change', () => {
        if (bookFileInput.files.length > 0) {
            // محاكاة التفكيك الفوري الشامل للوحدات المرفوعة وبناء الهيكل التكيفي المعتمد
            curriculumStepsContainer.innerHTML = `
                <li><strong>الوحدة الأولى (البناء الأولي الملموس):</strong> تم تفكيكها إلى (٤) دروس مجهزة تلقائياً بخطط التدرج الحسي والأنشطة العلاجية المقررة.</li>
                <li><strong>الوحدة الثانية (التنظيم المفاهيمي الحياتي):</strong> تم اعتماد معايير ربط المسائل اللفظية ببيئة الطلاب المحلية وتأمين أوراق عملها القياسية A4.</li>
            `;
            bookAnalysisResult.classList.remove('hidden');
        }
    });
});
