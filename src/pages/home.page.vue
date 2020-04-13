<template>
    <PageWrapper>
        <template v-slot:header>
            <div class="hotel-home__header">
                <div class="hotel-home__header-left">
                    <h4>The Manhattan at Times Square</h4>
                    <span class="icon-info_tooltip"/>
                </div>
                <div class="hotel-home__header-right">
                    <DateDocumentFilter />
                </div>
            </div>
        </template>

        <template v-slot:main>
            <div class="hotel-home__container">
                <div class="hotel-home__container__score-row">
                    <div class="ci-score-container">
                        <CiScore />
                    </div>
                    <div class="score-graph-container">
                        <ScoreContainer />
                    </div>
                </div>
                <div class="hotel-home__container__main-row">
                    <div class="hotel-home__container__main-row__graph-column">
                        <div class="rates-graph">
                            <RatesContainer />
                        </div>
                        <div class="visibility-graph">
                            <VisibilityContainer />
                        </div>
                        <div class="demand-graph">
                            <DemandGraphComponent />
                        </div>
                        <div class="guest-reviews">
                            <router-link to="/ranking" class="title">
                                Quest Reviews
                                <img src="@/assets/info.svg" />
                            </router-link>
                            <RankingProviders />
                        </div>
                    </div>
                    <div class="hotel-home__container__main-row__events">
                        <EventsContainer />
                    </div>
                </div>
            </div>
        </template>
    </PageWrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DateDocumentFilter from '@/components/document-filters/date-document-filter.vue';
import CiScore from '@/components/march-demo/home/ci-score.vue';
import ScoreContainer from '@/components/march-demo/home/score-container.vue';
import RatesContainer from '@/components/march-demo/home/rates-container.vue';
import DemandGraphComponent from '@/components/march-demo/home/demand-graph-component.vue';
import VisibilityContainer from '@/components/march-demo/home/visibility-container.vue';
import RankingProviders from '@/components/ranking/ranking-providers.vue';
import EventsContainer from '@/components/march-demo/home/events-container.vue';
import PageWrapper from '@/pages/common/page-wrapper.vue';

@Component({
    components: {
        PageWrapper,
        RankingProviders,
        VisibilityContainer,
        DemandGraphComponent,
        RatesContainer,
        ScoreContainer,
        CiScore,
        DateDocumentFilter,
        EventsContainer,
    },
})
export default class HomePage extends Vue {}
</script>

<style scoped lang="scss">
    @import "~@/assets/scss/variables.scss";

    .hotel-home {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 50px;

        &__header {
            padding: 17px 40px;
            height: 31px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: $white;
            box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.15);

            &-left {
                display: flex;
                align-items: center;

                h4 {
                    color: $header_blue;
                    font-weight: normal;
                    font-size: 25px;
                    line-height: 30px;
                    padding-right: 9px;
                }
            }

            &-right {
                display: flex;
                align-items: center;
            }
        }

        &__container {
            padding-top: 25px;
            width: 100%;
            display: flex;
            flex-direction: column;

            &__score-row {
                display: flex;
                height: 100%;

                .ci-score-container {
                    width: 25%;
                }

                .score-graph-container {
                    padding: 0 0 0 30px;
                    width: 75%;
                }
            }

            &__main-row {
                margin-top: 40px;
                display: flex;

                &__graph-column {
                    width: 70%;
                    flex: 1;

                    .rates-graph {
                        margin-bottom: 50px;
                    }

                    .demand-graph {
                        margin-bottom: 50px;
                    }

                    .visibility-graph {
                        margin-bottom: 50px;
                    }

                    .guest-reviews {

                        .title {
                            font-size: 16px;
                            text-transform: uppercase;
                            color: #2C2B2B;
                            display: flex;
                            align-items: center;
                            text-decoration: none;

                            img {
                                margin-left: 10px;
                            }
                        }
                    }
                }

                &__events {
                    width: 240px;
                    box-sizing: border-box;
                    margin-left: 50px;
                }
            }
        }
    }
</style>
