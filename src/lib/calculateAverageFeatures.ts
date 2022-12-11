import type { FeatureCollection, TrackFeatures } from './types';

export function calculateAverageFeatures(features: TrackFeatures[]) {
	const averageFeature: FeatureCollection = {
		acousticness: 0,
		danceability: 0,
		energy: 0,
		liveness: 0,
		valence: 0,
		instrumentalness: 0,
		speechiness: 0
	};

	features.forEach((feature) => {
		averageFeature.acousticness += feature.acousticness;
		averageFeature.danceability += feature.danceability;
		averageFeature.energy += feature.energy;
		averageFeature.liveness += feature.liveness;
		averageFeature.valence += feature.valence;
		averageFeature.instrumentalness += feature.instrumentalness;
		averageFeature.speechiness += feature.speechiness;
	});

	Object.keys(averageFeature).forEach((key) => {
		averageFeature[key as keyof FeatureCollection] /= features.length;
	});
	return averageFeature;
}
