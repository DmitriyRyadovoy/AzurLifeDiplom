import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth'
import interestItemKey from '../assets/Icons/HomePageIcons/icons8-ключ-50.png'
import Slider from '../components/slider';

import '../assets/styles/style.scss'
const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <div className="HomePage">
      <Layout>
        <div className="HomePage__header-content">
          <div className="HomePage__header-title-block"></div>
          <div className="container">
            <div className="HomePage__header-text-content">
              <div className="HomePage__header-title">
                <p>Подбор недвижимости c полным сопровождением в вашем регионе</p>
              </div>
              <div className="HomePage__header-text text">
                <p>Наше агентство специализируется на премиум объектах ипрезентует их Вам на русском языке. Подбор недвижимости во всей Франции c фокусом на самых привилегированных и живописных районах Французского Средиземноморья - Ницца, Канны или Лазурный Берег без лишних временных затрат и наценнок.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="HomePage__interest-content mb">
          <div className="container">
            <div className="HomePage__interest-block">
              <div className="HomePage__interest-title title">
                <p>Подберем по вашим интересам</p>
              </div>
              <div className="HomePage__interest-option-section">
                <div className="HomePage__interest-item">
                  <img src={interestItemKey} alt="keyImg" className='HomePage__interest-item-img' />
                  <p>Купить квартиру</p>
                </div>

                <div className="HomePage__interest-item">
                  <img src={interestItemKey} alt="keyImg" className='HomePage__interest-item-img' />
                  <p>Купить квартиру</p>
                </div>

                <div className="HomePage__interest-item">
                  <img src={interestItemKey} alt="keyImg" className='HomePage__interest-item-img' />
                  <p>Купить квартиру</p>
                </div>

                <div className="HomePage__interest-item">
                  <img src={interestItemKey} alt="keyImg" className='HomePage__interest-item-img' />
                  <p>Купить квартиру</p>
                </div>

                <div className="HomePage__interest-item">
                  <img src={interestItemKey} alt="keyImg" className='HomePage__interest-item-img' />
                  <p>Купить квартиру</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="HomePage__info mb">
          <div className="container">
            <div className="HomePage__info-text">
              <p className='title'>Управление <br /> недвижимостью</p>
              <p>Если Вы обладаете недвижимостью в России, мы станем посредниками между Вами и делами, которыми Вы бы предпочли не заниматься. Это возможно не только на этапе заключения сделки, но и при дальнейшем управлении собственностью. Мы свяжемся c ведомствами, налоговыми органами и операторами телефонной связи, мы оплатим счета или представим вас на ежегодном собрании собственников. Мы возьмем на себя все дела, связанные c Вашим личным присутствием и представим вас везде, где это требуется. Azur Life имеет все лицензии необходимые для этого.</p>
            </div>
          </div>
        </div>
        <div className="HomePage__section-suitable mb">
          <div className="container">
            <p className='title'>Почему Azur Life Вам подходит</p>
            <div className="HomePage__suitable">
              <div className="HomePage__suitable-item">
                <p className='HomePage__section-suitable-item-title'>100%</p>
                <p className='HomePage__section-suitable-item-text'>экспертное сопровождение любой сделки</p>
                <p>Ваше спокойствие приоритетно для нас: мы имеем все необходимые лицензии, страховые и финансовые гарантии, требуемые французским законодательством, чтобы осуществлять сделки c недвижимостью.</p>
              </div>

              <div className="HomePage__suitable-item">
                <p className='HomePage__section-suitable-item-title'>100%</p>
                <p className='HomePage__section-suitable-item-text'>экспертное сопровождение любой сделки</p>
                <p>Ваше спокойствие приоритетно для нас: мы имеем все необходимые лицензии, страховые и финансовые гарантии, требуемые французским законодательством, чтобы осуществлять сделки c недвижимостью.</p>
              </div>

              <div className="HomePage__suitable-item">
                <p className='HomePage__section-suitable-item-title'>100%</p>
                <p className='HomePage__section-suitable-item-text'>экспертное сопровождение любой сделки</p>
                <p>Ваше спокойствие приоритетно для нас: мы имеем все необходимые лицензии, страховые и финансовые гарантии, требуемые французским законодательством, чтобы осуществлять сделки c недвижимостью.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="HomePage__section-new-offers mb">
          <div className="container">
            <p className='title'>Новое на сайте</p>
            <Slider />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default HomePage;