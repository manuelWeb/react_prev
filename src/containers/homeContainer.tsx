import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../constants/AppInterfaces';
import history from '../helpers/history';

interface IComponentProps {
  title: string
}

/**
 * Container pour la page Home.
 * @param props Propriété du composant.
 */
const divStyle = {
  height: "200px",
  background: "#ccc",
};

const home = (props: IComponentProps) => (
  <div className="home">
    <h2>{props.title}</h2>

    <h2>flexbox</h2>
    <h3>.flex-container</h3>
    <section className="flex-container">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </section>
    <h3>.flex-container--column</h3>
    <section className="flex-container--column">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </section>
    <h3>item width</h3>
    <section className="flex-container">
      <div className="w33">.w33</div>
      <div className="w150p">.w150p</div>
      <div className="item-fluid">.item-fluid</div>
    </section>
    <h3>.item-first</h3>
    <section className="flex-container">
      <div>item</div>
      <div>item</div>
      <div className="item-first">.item-first</div>
    </section>
    <h3>.item-last</h3>
    <section className="flex-container">
      <div className="item-last">.item-last</div>
      <div>item</div>
      <div>item</div>
    </section>
    <h3>.item-center</h3>
    <section className="flex-container" style={divStyle}>
      <span className="item-center">.item-center</span>
    </section>

    <h2>.grid object</h2>
    <p><code>.grid</code> is meant for <b>one line display</b>. <br />Add any number of children and they will all be
				automagically inlined and have same size</p>
    <section className="grid">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
    </section>

    <h2>adding gutters: .grid.has-gutter</h2>
    <p>add a <code>.has-gutter</code> class when you need gutter between children</p>
    <section className="grid has-gutter">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </section>

    <h2>sizing gutters</h2>
    <p>add a <code>.has-gutter-l</code> or <code>.has-gutter-xl</code> class to change gutter size</p>
    <section className="grid has-gutter-xl">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </section>

    <h2>.grid and children sizing</h2>
    <p>children can be individually sized with classes such as <code>.one-half</code>, <code>.one-third</code>, <code>.one-quarter</code>,
				<code>.one-fifth</code>, <code>.two-thirds</code>, <code>.three-quarters</code>, <code>.one-sixth</code>, <code>.five-sixths</code>,
				or <code>.full</code></p>
    <section className="grid">
      <div className="one-fifth">.one-fifth</div>
      <div>...</div>
    </section>

    <h2>.grid.has-gutter and children sizing</h2>
    <p>works also with <code>.has-gutter</code> class</p>
    <section className="grid has-gutter">
      <div className="one-fifth">.one-fifth</div>
      <div>...</div>
      <div className="one-fifth">.one-fifth</div>
    </section>

    <h2>.grid-3</h2>
    <p>add a number suffix to <code>.grid</code> such as <code>-3</code> to switch into <b>multi-lines display</b> (from
				1 to 12)</p>
    <section className="grid-3">
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
    </section>

    <h2>.grid-3.has-gutter</h2>
    <p>works also with <code>.has-gutter</code> class</p>
    <section className="grid-3 has-gutter">
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
    </section>

    <h2>.grid-3</h2>
    <p>works also with sized children</p>
    <section className="grid-3">
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div className="one-half">.one-half</div>
      <div className="one-half">.one-half</div>
      <div className="one-third">.one-third</div>
      <div className="two-thirds">.two-thirds</div>
      <div className="full">.full</div>
      <div className="one-quarter">.one-quarter</div>
      <div className="one-quarter">.one-quarter</div>
      <div className="one-half">.one-half</div>
    </section>

    <h2>push / pull element</h2>
    <p>add <code>.push</code> or <code>.pull</code> class to create offsets</p>
    <section className="grid-4">
      <div>...</div>
      <div>...</div>
      <div>... </div>
      <div>...</div>
      <div>...</div>
      <div className="push">.push</div>
      <div>...</div>
    </section>

    <h2>first / last element</h2>
    <p>add <code>.grid-item-first</code> or <code>.grid-item-last</code> class to reorder elements</p>
    <section className="grid-4">
      <div>...</div>
      <div className="grid-item-last">.grid-item-last</div>
      <div>... </div>
      <div>...</div>
      <div>...</div>
      <div className="grid-item-first">.grid-item-first</div>
      <div>...</div>
    </section>

    <h2>reverse order: </h2>
    <p>add <code>--reverse</code> suffix on grid container to reverse the whole grid</p>
    <section className="grid-3--reverse-small-2">
      <div>one</div>
      <div>two</div>
      <div>three</div>
      <div>four</div>
      <div>five</div>
      <div>six</div>
      <div>seven</div>
    </section>

    <h2>.grid-3-small-2</h2>
    <p>add <code>-small-X</code> (X from 1 to 4) suffix to define column numbers on small screens, here will be 2
				columns. <i>Note : on tiny screens, value is always 1 column</i></p>
    <section className="grid-3-small-2">
      <div>...</div>
      <div>...</div>
      <div>... </div>
      <div>...</div>
      <div>...</div>
      <div>... </div>
      <div className="one-half">.one-half</div>
      <div className="one-half">.one-half</div>
      <div className="one-third">.one-third</div>
      <div className="two-thirds">.two-thirds</div>
      <div className="full">.full</div>
      <div className="one-quarter">.one-quarter</div>
      <div className="one-quarter">.one-quarter</div>
      <div className="one-half">.one-half</div>
    </section>

    <h2>.grid-4-small-3</h2>
    <section className="grid-4-small-3">
      <div>...</div>
      <div>...</div>
      <div>... </div>
      <div>...</div>
      <div>...</div>
    </section>

    <h2>.grid-6-small-4</h2>
    <section className="grid-6-small-4">
      <div>...</div>
      <div>...</div>
      <div>... </div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
    </section>

    <h2>.grid-3-small-2.has-gutter</h2>
    <p>works also with <code>.has-gutter</code> class</p>
    <section className="grid-3-small-2 has-gutter">
      <div>...</div>
      <div>...</div>
      <div>... </div>
      <div>...</div>
      <div>...</div>
      <div>... </div>
      <div className="one-half">.one-half</div>
      <div className="one-half">.one-half</div>
      <div className="one-third">.one-third</div>
      <div className="two-thirds">.two-thirds</div>
      <div className="full">.full</div>
      <div className="one-quarter">.one-quarter</div>
      <div className="one-quarter">.one-quarter</div>
      <div className="one-half">.one-half</div>
    </section>

    <h2>Sass mixin</h2>
    <p>you can design your own Sass mixin. Here : <code>.grid-sans-gouttiere &#123; &#64;include grid(4, 0); &#125;</code></p>
    <section className="grid-sans-gouttiere">
      <div>...</div>
      <div>...</div>
      <div>... </div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
    </section>

    <h2>Sass mixin and gutter</h2>
    <p>works also. Here : <code>.grid-perso &#123; &#64;include grid(4, 2rem); &#125;</code></p>
    <section className="grid-perso">
      <div>...</div>
      <div>...</div>
      <div>... </div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
      <div>...</div>
    </section>
                <button className="btn btn--success" onClick={() => history.push("/Account")} > account</button>

  </div>
);

function mapStateToProps(state: IAppState) {
  return {
    title: state.home.title
  }
}

export default connect(mapStateToProps)(home)
