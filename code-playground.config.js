module.exports = {
  // server port
  port: 3000,

  // title
  title: "s-rating-component",

  // layout
  layout: "right",

  // compile server
  compileServer: {
    // compile server port
    port: 4000
  },

  // demos
  demos: {
    smileys: {
      title: "Smileys",
      editors: {
        html: {
          language: "html",
          data: `
            <s-rating class="smileys" editable>
              <s-icon driver="fontawesome" icon="far fa-angry"></s-icon>
              <s-icon driver="fontawesome" icon="far fa-frown"></s-icon>
              <s-icon driver="fontawesome" icon="far fa-meh"></s-icon>
              <s-icon driver="fontawesome" icon="far fa-grin"></s-icon>
              <s-icon driver="fontawesome" icon="far fa-grin-stars"></s-icon>
            </s-rating>
          `
        }
      }
    },
    emoji: {
      title: "Emoji",
      editors: {
        html: {
          language: "html",
          data: `
            <s-rating class="emoji" based-on="100" value="40" for="rating-02" editable>
              <span>🍺</span>
              <span>🍺</span>
              <span>🍺</span>
              <span>🍺</span>
              <span>🍺</span>
            </s-rating>
          `
        }
      }
    },
    basedOn: {
      title: "Based on property",
      editors: {
        html: {
          language: "html",
          data: `
            <s-rating editable for="rating-01" value="40" based-on="100">
              <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
              <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
              <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
              <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
              <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
            </s-rating>
            <br><br>
            <input type="text" name="rating-01" id="rating-01" />
          `
        }
      }
    },
    notEditable: {
      title: "Not editable",
      editors: {
        html: {
          language: "html",
          data: `
            <s-rating for="rating-01" value="2.5">
              <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
              <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
              <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
              <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
              <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
            </s-rating>
          `
        }
      }
    }
  },

  // editors
  editors: {
    html: {
      language: "html",
      data: `
        <s-rating editable for="rating-01" value="2.5">
          <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
          <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
          <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
          <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
          <s-icon driver="fontawesome" icon="fas fa-star"></s-icon>
        </s-rating>
        <br><br>
        <input type="text" name="rating-01" id="rating-01" />
      `
    },
    css: {
      language: "scss",
      data: `
        @import 'node_modules/coffeekraken-sugar/index';

        @include s-setup(());
        @include s-init();
        @include s-classes();

        body {
          padding: s-space(bigger);
        }

        s-rating {
          color: s-color(primary, -lighten 30%);
          font-size: s-rem(20px);
        }
        [s-rating-hover] {
          color: s-color(primary);
          width: 50%;
          @include s-transition(fast);

          [mood="xlow"] & {
            color: #f22b2b;
          }
          [mood="low"] & {
            color: #f2892b;
          }
          [mood="medium"] & {
            color: s-color(primary);
          }
          [mood="high"] & {
            color: #f2cf2b;
          }
          [mood="xhigh"] & {
            color: #f2e22b;
          }
        }

        s-rating.smileys {
          .s-rating__item {
            margin-right: 2px;
          }
        }

        s-rating.emoji {
          .s-rating__item {
            opacity: .3;
            margin-right: 2px;
          }
          .s-rating__hover .s-rating__item {
            opacity: 1;
          }
        }
      `
    },
    js: {
      language: "js",
      data: `
        import SIconComponent from 'coffeekraken-s-icon-component'
        import SRatingComponent from './dist/index'
      `
    }
  }
}
